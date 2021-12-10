// Moralis
import { useNewMoralisObject, useMoralis, useMoralisQuery } from 'react-moralis'

// Components
import { TransferProduct } from './transfer'

// Classes
import ProductClass from '../classes/ProductClass'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/all'

// Sorting Library
import linq from 'linq'

interface TableData {
  product: string
  id: string
  price: number
  createdAt: Date
  purchaseButton: JSX.Element
}

interface SortingConfiguration {
  propertyName: keyof TableData
  sortType: SortingType
}

enum SortingType {
  Ascending,
  Descending,
}

const CreateProduct = ({
  name,
  price,
  recurrence,
  closeModal,
}: {
  price: number
  name: string
  recurrence: string
  closeModal: () => void
}) => {
  const { isSaving, error, save } = useNewMoralisObject('Products')
  const { user } = useMoralis()
  return (
    <div>
      {error}
      <button
        onClick={() => {
          closeModal()
          save({ name, price, recurrence, user })
        }}
        disabled={isSaving}
        className='px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer'
      >
        Add
      </button>
    </div>
  )
}
const FetchProduct = ({ query }: { query: string }) => {
  const { user } = useMoralis()

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([
    { propertyName: 'createdAt', sortType: SortingType.Descending },
  ])

  useEffect(() => {
    // console.log("sort config: ", sortConfig);
  }, [sortConfig])

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
      } else {
        sorted = sorted
          .thenByDescending((dataRow: any) =>
            dataRow[propertyName] === null ? -1 : 1
          )
          .thenByDescending((dataRow: any) => dataRow[propertyName])
      }
    })

    let names = products.map((a) => a.name)

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
      const name = dataRow.name
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
  }, [sortConfig, products, query])

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
      {sortedRows.map((product) => {
        let newDate = new Date(product.createdAt)
        return (
          <tr key={product.objectId}>
            <td>{product.name}</td>
            <td>{product.objectId}</td>
            <td>{product.price} MATIC</td>
            <td>{product.recurrence}</td>
            <td>{newDate.toString()}</td>
            <td className='flex justify-center items-center'>
              <TransferProduct
                objectId={product.objectId}
                recurrence={product.recurrence}
                price={product.price}
                name={product.name}
              />
            </td>
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
    { label: 'Recurrence', property: 'recurrence' as keyof TableData },
    { label: 'Created At', property: 'createdAt' as keyof TableData },
    { label: 'Purchase', property: 'purchaseButton' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    var config = sortConfig.find(
      (sortConfig) => sortConfig.propertyName === property
    )
    return config ? (
      config.propertyName === 'purchaseButton' ? null : config.sortType ===
        SortingType.Descending ? (
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
