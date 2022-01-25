// Components
import Billing from './Billing'

// Icons
import { BsCalendarEvent } from 'react-icons/bs'

// Hooks
import { DisplayChart } from '../../../../backend/Analytics'

// Dropdown
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

// React
import { useState } from 'react'

const Overview = () => {
  const [timeFrame, setTimeFrame] = useState('Last Week')

  const options = ['Last Week', 'Last Month', 'Last Year']
  const defaultOption = options[0]

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-3xl underline font-medium'>Overview</h2>
        <Dropdown
          options={options}
          onChange={(e) => setTimeFrame(e.value)}
          value={defaultOption}
          controlClassName='bg-dark text-white font-display rounded-t border-none w-56 flex justify-center items-center cursor-pointer'
          arrowClassName='mt-1'
          menuClassName='bg-dark text-white font-display border-none rounded-b cursor-pointer'
          placeholderClassName='ml-7'
        />
      </div>

      <Billing />

      <DisplayChart timeFrame={timeFrame} />
    </div>
  )
}

export default Overview
