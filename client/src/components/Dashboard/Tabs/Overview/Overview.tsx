// Components
import Billing from './Billing'
import Subscriptions from './Subscriptions'
import Chart from './Chart.jsx'

// Icons
import { BsCalendarEvent } from 'react-icons/all'

// Hooks
import { useState } from 'react'

const Overview = () => {
  const [selectedTab, setSelectedTab] = useState('Billing')

  return (
    <div className='w-full'>
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
      {/* Chart will come here  */}
      <Chart className=" bg-dark mt-3 rounded-lg"/>
    </div>
  )
}

export default Overview

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
      <p className='text-base'>{tab}</p>
      <div
        className={`${
          selected ? 'auto' : 'hidden'
        } w-full h-1.5 bg-primary rounded-b-lg`}
      ></div>
    </div>
  )
}
