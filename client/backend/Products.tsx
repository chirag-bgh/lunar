// Moralis
import { useNewMoralisObject, useMoralis, useMoralisQuery } from 'react-moralis'

// Classes
import ProductClass from '../classes/ProductClass'

// Hooks
import { useCallback, useEffect, useMemo, useState } from 'react'

// Icons
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { productgetter } from '../API/products'

// Sorting Library
import linq from 'linq'
import Loader from 'react-loader-spinner'
import { monthNames } from './Utils'

interface TableData {
  product: string
  id: string
  price: number
  created_at: Date
  purchaseButton: JSX.Element
  removeButton: JSX.Element
  //there is no column  no
}

interface SortingConfiguration {
  propertyName: keyof TableData
  sortType: SortingType
}

enum SortingType {
  Ascending,
  Descending,
}

import { productdestroy } from '../API/products'
// Deletes product from the Moralis DB where objectID == obejectID
const DeleteProduct = ({ objectId }: { objectId: string }) => {
  const [destroy, setDestroy] = useState(false)

  const { user } = useMoralis()

  useEffect(() => {
    if (destroy) {
      productdestroy({ address: objectId, token: user?.get('token') })
      setDestroy(false)
    }
  }, [destroy])

  return (
    <div className='flex justify-center items-center'>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setDestroy(true)
        }}
        className='h-7 text-sm rounded-sm text-black font-display px-2 flex justify-center items-center cursor-pointer z-50'
      >
        {!destroy ? (
          <FaTrash style={{ color: 'rgb(239 68 68)' }} />
        ) : (
          <div className='flex justify-center items-center'>
            <Loader type='Puff' color='#87F1FF' height={20} width={30} />
          </div>
        )}
      </button>
    </div>
  )
}

//Creates product by taking in name, price, recurrence as input
const CreateProduct = ({
  name,
  price,
  recurrence,
  closeModal,
  acceptedCurrencies,
}: {
  price: number
  name: string
  recurrence: string
  closeModal: () => void
  acceptedCurrencies: string[]
}) => {
  const { isSaving, error, save } = useNewMoralisObject('Products')
  const { user } = useMoralis()

  return (
    <div>
      {error}
      <button
        onClick={async () => {
          closeModal()
          await save({
            name,
            price,
            recurrence,
            user: user?.id,
            managed_account: user?.get('managed_account_pub'),
            callback_url: user?.get('callbackURL'),
            webhook_url: user?.get('webhookURL'),
            acceptedCurrencies: acceptedCurrencies,
          })
        }}
        disabled={isSaving}
        className='px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer'
      >
        Add
      </button>
    </div>
  )
}

// Takes query as input and returns sorted product array
const FetchProduct = ({ query }: { query: string }) => {
  const { user } = useMoralis()

  let token = user?.get('token')

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([
    { propertyName: 'created_at', sortType: SortingType.Descending },
  ])

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  useEffect(() => {
    if (!accfetched) {
      productgetter({ setAcc, token })
      setaccfetched(true)
    }
  }, [])

  const setAcc = ({ z }: { z: any }) => {
    setAccounts(z)
  }

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

  if (products.length === 0) {
    return (
      <div className='w-full h-96 bg-dark flex justify-center items-center mt-6 text-xl font-display rounded-lg'>
        <h3>Create a product to get started.</h3>
      </div>
    )
  }

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <tbody>
        <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
        {sortedRows.map((product: any) => {
          let newDate = new Date(product.created_at)
          return (
            <tr
              key={product.objectId}
              id={product.objectId}
              onMouseEnter={() => {
                let element = document.getElementById(product.objectId)
                element ? (element.style.backgroundColor = '#87F1FF') : null
                element ? (element.style.color = '#1E1E1F') : null
              }}
              onMouseLeave={() => {
                let element = document.getElementById(product.objectId)
                element ? (element.style.backgroundColor = '#1E1E1F') : null
                element ? (element.style.color = 'white') : null
              }}
              className='cursor-pointer hover:bg-slate-300 hover:text-dark transition-colors'
              onClick={() => {
                window.open(
                  `http://app.lunarpay.in/product/${product.objectId}`,
                  '_blank'
                )
              }}
            >
              <td>{product.name}</td>
              <td>{product.objectId}</td>
              <td>
                {product.price} MATIC
              </td>
              <td>{product.recurrence}</td>
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
              <td>
                <DeleteProduct objectId={product.objectId} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { CreateProduct, FetchProduct }

//ITEM Display sorter
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
    { label: 'Created At', property: 'created_at' as keyof TableData },
    //  { label: "Purchase", property: "purchaseButton" as keyof TableData },
    { label: 'Remove', property: 'removeButton' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    let config = sortConfig.find(
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
