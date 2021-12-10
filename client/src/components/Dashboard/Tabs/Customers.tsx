import { useState } from 'react'
import { FetchCustomer } from '../../../backend/Customer'

const Customers = () => {
  const [selectedTab, setSelectedTab] = useState('Products')

  return (
    <div className='w-full'>
      <div className='w-full flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Customers</h2>
      </div>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'Products' ? <ProductsTable /> : <SubscriptionsTable />}
    </div>
  )
}

const ProductsTable = () => {
  return <FetchCustomer />
}
const SubscriptionsTable = () => {
  return <FetchCustomer />
}

const Tabs = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string
  setSelectedTab: (arg: string) => void
}) => {
  return (
    <div className='my-8 flex justify-start items-center gap-2'>
      <TabItem
        tab='Products'
        selected={selectedTab === 'Products' ? true : false}
        setSelectedTab={setSelectedTab}
      />
      <TabItem
        tab='Subscriptions'
        selected={selectedTab === 'Subscriptions' ? true : false}
        setSelectedTab={setSelectedTab}
      />
    </div>
  )
}

const TabItem = ({
  tab,
  selected,
  setSelectedTab,
}: {
  tab: string
  selected: boolean
  setSelectedTab: (arg: string) => void
}) => {
  return (
    <div
      onClick={() => setSelectedTab(tab)}
      className={`h-10 w-48 rounded-lg cursor-pointer bg-dark flex flex-col justify-${
        selected ? 'between' : 'center'
      } items-center text-white text-lg font-display`}
    >
      <div></div>
      <p className='text-base'>{tab}</p>
      <div
        className={`${
          selected ? 'auto' : 'hidden'
        } w-full h-1.5 bg-primary rounded-b-lg`}
      ></div>
    </div>
  )
}

export default Customers
