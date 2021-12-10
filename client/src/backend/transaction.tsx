import { useMoralis, useMoralisQuery } from 'react-moralis'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/all'
import TransactionClass from '../classes/TransactionClass'

// Sorting Library
import linq from 'linq'
import { useCallback, useMemo, useState } from 'react'

interface TableData {
  product: string
  objectId: string
  customerId: string
  amount: number
  type: string
  createdAt: Date
}

interface SortingConfiguration {
  propertyName: keyof TableData
  sortType: SortingType
}

enum SortingType {
  Ascending,
  Descending,
}

// export const DisplayTransaction = () => {
//   const { user } = useMoralis()
//   const userAddress = user.get('managed_account_pub')
//   const { data, error, isLoading } = useMoralisQuery('Transactions', (query) =>
//     query.equalTo('to_address', userAddress)
//   )

//   if (error) {
//     console.log(error)
//     return <span>🤯</span>
//   }

//   if (isLoading) {
//     return <span>🙄</span>
//   }

//   return <pre>Hi {JSON.stringify(data, null, 2)}</pre>
// }

export const FetchTransaction = ({ query }: { query: string }) => {
  const { user } = useMoralis()

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([
    { propertyName: 'createdAt', sortType: SortingType.Ascending },
  ])

  const sortBy = useCallback(
    (propertyName: keyof TableData) => {
      let pendingChange = [...sortConfig]
      const index = pendingChange.findIndex(
        (config) => config.propertyName === propertyName
      )
      if (index > -1) {
        //Save the sortType
        var currentSortType = pendingChange[index].sortType
        //Remove existing config
        pendingChange.splice(index, 1)
        //check if the sort type we saved is descending
        if (currentSortType === SortingType.Descending) {
          pendingChange = [
            ...pendingChange,
            { propertyName: propertyName, sortType: SortingType.Ascending },
          ]
        }
      } else {
        pendingChange = [
          ...pendingChange,
          { propertyName: propertyName, sortType: SortingType.Descending },
        ]
      }

      if (pendingChange.length > 1) {
        pendingChange.splice(0, 1)
      }
      updateSortConfig([...pendingChange])
    },
    [sortConfig]
  )

  const userAddress = user.get('managed_account_pub')

  const { data } = useMoralisQuery('Transactions', (query) =>
    query.equalTo('to_address', userAddress)
  )

  let json = JSON.stringify(data, null, 2)

  // console.log('json: ', json)

  const transactions: TransactionClass[] = JSON.parse(json)

  const sortedRows = useMemo(() => {
    //Set up default ordering
    let sorted = linq.from(transactions).orderBy(() => 1)

    //Loop through the queue
    sortConfig.forEach((sortConfig) => {
      let propertyName: any = sortConfig.propertyName
      if (sortConfig.propertyName === 'type') {
        propertyName = 'Type'
      }
      if (sortConfig.sortType === SortingType.Ascending) {
        sorted = sorted
          .thenBy((dataRow: any) => (dataRow[propertyName] === null ? -1 : 1))
          .thenBy((dataRow: any) => dataRow[propertyName])
      } else {
        sorted = sorted
          .thenByDescending((dataRow: any) =>
            dataRow[propertyName] === null ? -1 : 1
          )
          .thenByDescending((dataRow: any) => dataRow[propertyName])
      }
    })

    let names = transactions.map((a) => a.product)

    // console.log("names", names);

    let filteredNames = names
      .sort()
      .filter((txt: string) => txt.indexOf(query) !== -1)

    // console.log("filteredNames", filteredNames);

    if (filteredNames.length === 0) {
      return []
    }

    let sortedArray = sorted.toArray()

    for (let i = 0; i < sortedArray.length; i++) {
      const dataRow = sortedArray[i]
      const name = dataRow.product
      for (let j = 0; j < filteredNames.length; j++) {
        let filteredName = filteredNames[j]
        if (!name.startsWith(filteredName) && query !== '') {
          sortedArray.splice(i, 1)
          i--
          break
        }
      }
    }

    return sortedArray
  }, [sortConfig, transactions, query])

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
      {sortedRows.map((transaction) => {
        let newDate = new Date(transaction.createdAt)
        return (
          <tr key={transaction.objectId}>
            <td>{transaction.product}</td>
            <td>{transaction.objectId}</td>
            <td>{transaction.amount} MATIC</td>
            <td>{transaction.Type}</td>
            <td>{transaction.customerid}</td>
            <td>{newDate.toString()}</td>
          </tr>
        )
      })}
    </table>
  )
}

interface SortableHeaderProps {
  sortBy: (string: keyof TableData) => void
  sortConfig: SortingConfiguration[]
}

const SortableHeader = ({ sortBy, sortConfig }: SortableHeaderProps) => {
  const tableColumn = [
    { label: 'Product', property: 'product' as keyof TableData },
    { label: 'ID', property: 'objectId' as keyof TableData },
    { label: 'Price', property: 'amount' as keyof TableData },
    { label: 'Type', property: 'type' as keyof TableData },
    { label: 'Customer ID', property: 'customerId' as keyof TableData },
    { label: 'Created At', property: 'createdAt' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    var config = sortConfig.find(
      (sortConfig) => sortConfig.propertyName === property
    )
    return config ? (
      config.sortType === SortingType.Descending ? (
        <MdArrowDropDown className='text-white text-2xl' />
      ) : (
        <MdArrowDropUp className='text-white text-2xl' />
      )
    ) : null
  }

  return (
    <tr className='border-gray-500 border-b-2'>
      {tableColumn.map((column, index) => {
        return (
          <th
            className='cursor-pointer'
            key={index}
            onClick={() => sortBy(column.property)}
          >
            <span className='flex justify-center items-center'>
              {column.label}
              {getSortDirection(column.property)}
            </span>
          </th>
        )
      })}
    </tr>
  )
}
