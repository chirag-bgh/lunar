import { useParams } from 'react-router-dom'

import { IoArrowBack, MdArrowDropDown, MdArrowDropUp } from 'react-icons/all'
import { useMoralisQuery } from 'react-moralis'

// Sorting Library
import linq from 'linq'
import { useCallback, useMemo, useState } from 'react'
import TransactionClass from '../classes/TransactionClass'

import { Logo } from './Dashboard/Dashboard'

interface TableData {
  product: string
  objectId: string
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

const CustomerPage = () => {
  let params = useParams()
  const customerId = params.id

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

  const { data } = useMoralisQuery('Transactions', (query) =>
    query.equalTo('customerid', customerId)
  )

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

    return sorted.toArray()
  }, [sortConfig, transactions])

  return (
    <div
      style={{
        backgroundColor: '#0A0908',
        backgroundPosition: '200px 0%',
        transition: 'all 0.5s',
      }}
      className='w-screen flex-col h-screen bg-moon bg-center bg-no-repeat bg-cover flex justify-between items-center'
    >
      <div className='flex justify-start items-center w-5/6 mt-4 '>
        <IoArrowBack
          className='text-white text-3xl cursor-pointer z-10'
          onClick={() => {
            window.history.back()
          }}
        />
      </div>
      <Logo className='absolute top-0 left-50' />
      <div className='w-5/6 flex flex-col justify-center items-start'>
        <h1 className='font-display font-semibold text-2xl'>
          Customer ID: {customerId}
        </h1>
        <table className='text-white bg-dark mt-5 rounded-lg'>
          <tbody>
            <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
            {sortedRows.map((transaction) => {
              let newDate = new Date(transaction.createdAt)
              return (
                <tr key={transaction.objectId}>
                  <td>{transaction.product}</td>
                  <td>{transaction.objectId}</td>
                  <td>{transaction.amount} MATIC</td>
                  <td>{transaction.Type}</td>
                  <td>{newDate.toString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
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

export default CustomerPage
