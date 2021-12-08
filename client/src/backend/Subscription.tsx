import { useNewMoralisObject, useMoralis, useMoralisQuery } from 'react-moralis'
// import Moralis from 'moralis'

// Classes
import SubscriptionClass from '../classes/SubscriptionClass'

// Hooks
import { useCallback, useMemo, useState } from 'react'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/all'

// Sorting Library
import linq from 'linq'

interface TableData {
  product: string
  id: string
  price: number
  recurrence: string
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

const CreateSubscription = ({
  name,
  price,
  recurrence,
}: {
  price: number
  name: string
  recurrence: string
}) => {
  const { isSaving, error, save } = useNewMoralisObject('Subscription')
  const { user } = useMoralis()
  return (
    <div>
      {error}
      <button
        onClick={() => save({ name, price, user, recurrence })}
        disabled={isSaving}
      >
        Create Subscription
      </button>
    </div>
  )
}
const FetchSubscription = () => {
  const { user } = useMoralis()

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
      updateSortConfig([...pendingChange])
    },
    [sortConfig]
  )

  const { data } = useMoralisQuery('Subscription', (query) =>
    query.equalTo('user', user)
  )

  let json = JSON.stringify(data, null, 2)

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
      if (sortConfig.propertyName === 'id') {
        propertyName = 'objectId'
      }
      if (sortConfig.sortType === SortingType.Ascending) {
        sorted = sorted
          .thenBy((dataRow: any) => (dataRow[propertyName] === null ? -1 : 1))
          .thenBy((dataRow: any) => dataRow[propertyName])

        console.log('sorted array: ', sorted.toArray())
      } else {
        sorted = sorted
          .thenByDescending((dataRow: any) =>
            dataRow[propertyName] === null ? -1 : 1
          )
          .thenByDescending((dataRow: any) => dataRow[propertyName])
        console.log('sorted array: ', sorted.toArray())
      }
    })

    return sorted.toArray()
  }, [sortConfig, subsriptions])

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
      {sortedRows.map((subscription) => {
        let newDate = new Date(subscription.createdAt)
        return (
          <tr key={subscription.objectId}>
            <td>{subscription.name}</td>
            <td>{subscription.objectId}</td>
            <td>{subscription.price} ETH</td>
            <td>{subscription.recurrence}</td>
            <td>{newDate.toString()}</td>
          </tr>
        )
      })}
    </table>
  )
}

export { CreateSubscription, FetchSubscription }

interface SortableHeaderProps {
  sortBy: (string: keyof TableData) => void
  sortConfig: SortingConfiguration[]
}

const SortableHeader = ({ sortBy, sortConfig }: SortableHeaderProps) => {
  const tableColumn = [
    { label: 'Subscription', property: 'product' as keyof TableData },
    { label: 'ID', property: 'id' as keyof TableData },
    { label: 'Price', property: 'price' as keyof TableData },
    { label: 'Recurrence', property: 'recurrence' as keyof TableData },
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
