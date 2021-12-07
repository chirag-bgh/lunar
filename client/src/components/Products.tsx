import { useNewMoralisObject, useMoralis, useMoralisQuery } from 'react-moralis'
// import Moralis from 'moralis'

// Classes
import ProductClass from './ProductClass'

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

const CreateProduct = ({ name, price }: { price: number; name: string }) => {
  const { isSaving, error, save } = useNewMoralisObject('Products')
  const { user } = useMoralis()
  return (
    <div>
      {error}
      <button onClick={() => save({ name, price, user })} disabled={isSaving}>
        Create Product
      </button>
    </div>
  )
}
const FetchProduct = () => {
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

  const { data } = useMoralisQuery('Products', (query) =>
    query.equalTo('user', user)
  )

  let json = JSON.stringify(data, null, 2)

  const products: ProductClass[] = JSON.parse(json)

  const sortedRows = useMemo(() => {
    //Set up default ordering
    let sorted = linq.from(products).orderBy(() => 1)

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
        // }
      }
    })

    return sorted.toArray()
  }, [sortConfig, products])

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
      {sortedRows.map((product) => {
        return (
          <tr key={product.objectId}>
            <td>{product.name}</td>
            <td>{product.user.objectId}</td>
            <td>{product.price} ETH</td>
            <td>{product.createdAt}</td>
          </tr>
        )
      })}
    </table>
  )
}

export { CreateProduct, FetchProduct }

interface SortableHeaderProps {
  sortBy: (string: keyof TableData) => void
  sortConfig: SortingConfiguration[]
}

const SortableHeader = ({ sortBy, sortConfig }: SortableHeaderProps) => {
  const tableColumn = [
    { label: 'Product', property: 'product' as keyof TableData },
    { label: 'ID', property: 'id' as keyof TableData },
    { label: 'Price', property: 'price' as keyof TableData },
    { label: 'Created At', property: 'createdAt' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    var config = sortConfig.find(
      (sortConfig) => sortConfig.propertyName === property
    )
    return config ? (
      // config.propertyName === 'price' || config.propertyName === 'createdAt' ? (
      config.sortType === SortingType.Descending ? (
        <MdArrowDropDown className='text-white text-2xl' />
      ) : (
        <MdArrowDropUp className='text-white text-2xl' />
      )
    ) : // ) : null
    null
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
