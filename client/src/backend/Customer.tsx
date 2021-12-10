import { useCallback, useMemo, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { CustomerClass } from '../classes/CustomerClass'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/all'

// Sorting Library
import linq from 'linq'

interface TableData {
  objectId: string
  Type: string
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

export const FetchCustomer = () => {
  const { user } = useMoralis()

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([
    { propertyName: 'createdAt', sortType: SortingType.Descending },
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

  const userAddress = user.id
  const { data } = useMoralisQuery('Customer', (query) =>
    query.equalTo('User', userAddress)
  )
  let json = JSON.stringify(data, null, 2)

  // console.log('json: ', json)

  const customers: CustomerClass[] = JSON.parse(json)

  const sortedRows = useMemo(() => {
    //Set up default ordering
    let sorted = linq.from(customers).orderBy(() => 1)

    //Loop through the queue
    sortConfig.forEach((sortConfig) => {
      let propertyName: any = sortConfig.propertyName
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

    return sorted.toArray()
  }, [sortConfig, customers])

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
      {sortedRows.map((customer) => {
        let newDate = new Date(customer.createdAt)
        return (
          <tr key={customer.objectId}>
            <td>{customer.objectId}</td>
            <td>{customer.Type}</td>
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
    { label: 'ID', property: 'objectId' as keyof TableData },
    { label: 'Type', property: 'type' as keyof TableData },
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

export const DisplayCustomer = () => {
  const { user } = useMoralis()
  const userAddress = user.id
  const { data, error, isLoading } = useMoralisQuery('Customer', (query) =>
    query.equalTo('User', userAddress)
  )

  if (error) {
    console.log(error)
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
