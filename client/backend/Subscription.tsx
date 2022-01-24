import { useNewMoralisObject, useMoralis, useMoralisQuery } from 'react-moralis'
// import Moralis from 'moralis'
import { subscriptiongetter } from '../API/subscription'

// Classes
import SubscriptionClass from '../classes/SubscriptionClass'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'

// Sorting Library
import linq from 'linq'
import { monthNames } from './Utils'

interface TableData {
  product: string
  price: number
  recurrence: string
  created_at: Date
  email: string
}

interface SortingConfiguration {
  propertyName: keyof TableData
  sortType: SortingType
}

enum SortingType {
  Ascending,
  Descending,
}

const FetchSubscription = ({ query }: { query: string }) => {
  const { user } = useMoralis()

  let token = user?.get('token')

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([
    { propertyName: 'price', sortType: SortingType.Ascending },
  ])

  const sortBy = useCallback(
    (propertyName: keyof TableData) => {
      let pendingChange = [...sortConfig]
      const index = pendingChange.findIndex(
        (config) => config.propertyName === propertyName
      )
      if (index > -1) {
        //Save the sortType
        let currentSortType = pendingChange[index].sortType
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

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  useEffect(() => {
    if (!accfetched) {
      subscriptiongetter({ setAcc, token })
      setaccfetched(true)
    }
  }, [])

  const setAcc = ({ z }: { z: any }) => {
    setAccounts(z)
  }

  let json = JSON.stringify(data, null, 2)
  // console.log("json: ", json);

  const subsriptions: SubscriptionClass[] = JSON.parse(json)

  const sortedRows = useMemo(() => {
    //Set up default ordering
    let sorted = linq.from(subsriptions).orderBy(() => 1)

    //Loop through the queue
    sortConfig.forEach((sortConfig) => {
      let propertyName: any = sortConfig.propertyName
      if (sortConfig.propertyName === 'product') {
        propertyName = 'name'
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

    let names = subsriptions.map((a) => a.product)

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
  }, [sortConfig, subsriptions, query])

  if (sortedRows.length === 0) {
    return (
      <div className='w-full h-96 bg-dark flex justify-center items-center mt-6 text-xl font-display rounded-lg'>
        <h3>No subscription plans to display yet</h3>
      </div>
    )
  }

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <tbody>
        <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
        {sortedRows.map((subscription) => {
          let newDate = new Date(subscription.created_at)
          return (
            <tr key={subscription.product}>
              <td>{subscription.product}</td>
              <td>{subscription.status}</td>
              <td>{subscription.price} USD</td>
              <td>{subscription.recurrence}</td>
              <td>{subscription.email}</td>
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
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { FetchSubscription }

interface SortableHeaderProps {
  sortBy: (string: keyof TableData) => void
  sortConfig: SortingConfiguration[]
}

const SortableHeader = ({ sortBy, sortConfig }: SortableHeaderProps) => {
  const tableColumn = [
    { label: 'Product', property: 'product' as keyof TableData },
    { label: 'Status', property: 'status' as keyof TableData },
    { label: 'Price', property: 'price' as keyof TableData },
    { label: 'Recurrence', property: 'recurrence' as keyof TableData },
    { label: 'Email', property: 'email' as keyof TableData },
    { label: 'Created At', property: 'created_at' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    let config = sortConfig.find(
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
