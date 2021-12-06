// Components
import Sidebar from './Sidebar'
import Billing from './Billing'
import Subscriptions from './Subscriptions'

// Icons
import { IoMdMoon, BsCalendarEvent } from 'react-icons/all'

// Hooks
import { useState } from 'react'

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Billing')

  return (
    <div className='w-screen h-screen bg-background flex justify-center items-center'>
      <Sidebar />
      <div className='w-4/5 h-full flex flex-col justify-start items-start px-10'>
        <Logo />
        <div className='w-full flex justify-between items-center'>
          <h2 className='text-3xl underline font-medium'>Overview</h2>
          <div className='flex justify-between items-center h-8 w-60 bg-dark rounded-md'>
            <div></div>
            <p className='text-md font-extralight ml-2'>Last Month</p>
            <BsCalendarEvent className='text-white text-md mr-4' />
          </div>
        </div>
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 'Billing' ? (
          <Billing revenue={1} transactions={34} />
        ) : (
          <Subscriptions />
        )}
      </div>
    </div>
  )
}

export default Dashboard

const Logo = () => {
  return (
    <div className='w-full flex justify-center items-center my-4'>
      <IoMdMoon className='text-white text-3xl mr-2' />
      <p className='font-medium text-xl pt-1'>lunar</p>
    </div>
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
        tab='Billing'
        selected={selectedTab === 'Billing' ? true : false}
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
      <p>{tab}</p>
      <div
        className={`${
          selected ? 'auto' : 'hidden'
        } w-full h-1.5 bg-primary rounded-b-lg`}
      ></div>
    </div>
  )
}
