import { useMoralis, useMoralisQuery } from 'react-moralis'
import { transactiongetter } from '../API/transactions'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import TransactionClass from '../classes/TransactionClass'

// Sorting Library
import linq from 'linq'
import { useCallback, useMemo, useState } from 'react'
import { monthNames } from './Utils'

interface TableData {
  product: string
  email: string
  amount: number
  type: string
  created_at: Date
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
    { propertyName: 'created_at', sortType: SortingType.Descending },
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

  const userAddress = user?.get('managed_account_pub')
  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    transactiongetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
  }
  

  let json = JSON.stringify(data, null, 2)

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
      <tbody>
        <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
        {sortedRows.map((transaction) => {
          let newDate = new Date(transaction.created_at)
          return (
            <tr key={transaction.product}>
              <td>{transaction.product}</td>
              <td>{transaction.amount} ETH</td>
              <td>{transaction.type}</td>
              <td>{transaction.email}</td>
              <td>
                {newDate.getDate() +
                  ' ' +
                  monthNames[newDate.getMonth()] +
                  ' ' +
                  newDate.getFullYear() +
                  ' - ' +
                  newDate.getHours() +
                  ':' +
                  (newDate.getMinutes().toString().length == 1
                    ? '0' + newDate.getMinutes()
                    : newDate.getMinutes())}
              </td>{' '}
            </tr>
          )
        })}
      </tbody>
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
    { label: 'Price', property: 'amount' as keyof TableData },
    { label: 'Type', property: 'type' as keyof TableData },
    { label: 'Email', property: 'email' as keyof TableData },
    { label: 'Date', property: 'created_at' as keyof TableData },
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
