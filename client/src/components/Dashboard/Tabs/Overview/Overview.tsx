// Components
import Billing from './Billing'

// Icons
import { BsCalendarEvent } from 'react-icons/bs'

// Hooks
import { useState } from 'react'
import { DisplayChart } from '../../../../backend/Analytics'

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

      <Billing />

      <ChartComponent />
    </div>
  )
}

export default Overview

export const ChartComponent = () => {
  return <DisplayChart />
}
