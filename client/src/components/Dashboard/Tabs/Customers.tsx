import { useState } from "react"

const Customers = () => {

    const [selectedTab, setSelectedTab] = useState('Products')

    return (
        <div className='w-full'>
          <div className='w-full flex flex-col justify-between items-start'>
            <h2 className='text-3xl underline font-medium'>Customers</h2>
          </div>
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'Products' ? (
                <ProductsTable/>
            ) : (
                <SubscriptionsTable/>
            )}
          {/* <div className='flex h-8 justify-end items-between gap-1 mt-12'>
              <input
                className='h-full w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm'
                type='text'
                placeholder='Search by customer id or name'
              />
              <div className='w-16 h-full rounded-sm bg-primary flex justify-center items-center'>
                Search
            </div>
          </div> */}
        
    
        </div>
      )
}

const ProductsTable = () => {
    return (
        <table className='text-white bg-dark w-full mt-5 rounded-lg'>
        <tr className='border-gray-500 border-b-2'>
          <th>Product</th>
          <th>ID</th>
          <th>Quantity</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
        <tr className='h-80'>
          <td></td>
        </tr>
      </table>
    )
}
const SubscriptionsTable = () => {
    return (
        <table className='text-white bg-dark w-full mt-5 rounded-lg'>
        <tr className='border-gray-500 border-b-2'>
          <th>Product</th>
          <th>ID</th>
          <th>First Billing</th>
          <th>Next Billing</th>
          <th>Customer</th>
        </tr>
        <tr className='h-80'>
          <td></td>
        </tr>
      </table>
    )
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