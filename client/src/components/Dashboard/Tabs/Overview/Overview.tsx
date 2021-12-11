// Components
import Billing from './Billing'
import Subscriptions from './Subscriptions'
import ChartExample from './Chart'

// Icons
import { BsCalendarEvent } from 'react-icons/all'

// Hooks
import { useEffect, useState } from 'react'

const Overview = () => {
  const [selectedTab, setSelectedTab] = useState('Products')

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-3xl underline font-medium'>Overview</h2>
        <div className='flex justify-between items-center h-8 w-60 bg-dark rounded-md'>
          <div></div>
          <p className='text-md font-extralight ml-2'>Last Month</p>
          <BsCalendarEvent className='text-white text-md mr-4' />
        </div>
      </div>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === 'Products' ? (
        <div>
          <Billing revenue={1000} transactions={34} />
        </div>
      ) : (
        <p></p>
      )}
      <div></div>
      {/* Chart will come here  */}
      {selectedTab === 'Products' ? (
        <ChartComponent recurrence='One time' />
      ) : (
        <ChartComponent recurrence='Not one time' />
      )}
    </div>
  )
}

export default Overview

export const ChartComponent = ({ recurrence }: { recurrence: string }) => {
  //   return <ChartExample />
  return <div></div>
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
