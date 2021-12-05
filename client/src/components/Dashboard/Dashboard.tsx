// Components
import Sidebar from './Sidebar'

// Icons
import { IoMdMoon, BsCalendarEvent } from 'react-icons/all'

const Dashboard = () => {
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

const Tabs = (selectedTab: string) => {}
