// Components
import Sidebar from './Sidebar'
import Overview from './Tabs/Overview/Overview'
import Transactions from './Tabs/Transactions'
import Products from './Tabs/Products'
import Subscriptions from './Tabs/Subscriptions'
import Payouts from './Tabs/Payouts'

// Icons
import { IoMdMoon } from 'react-icons/all'

// Hooks
import { useState } from 'react'

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Overview')

  function GetTab({ selectedTab }: { selectedTab: string }) {
    switch (selectedTab) {
      case 'Overview':
        return <Overview />
      case 'Transactions':
        return <Transactions />
      case 'Products':
        return <Products />
      case 'Subscription Plans':
        return <Subscriptions />
      case 'Payouts':
        return <Payouts />
      default:
        return <Overview />
    }
  }

  return (
    <div className='w-screen h-screen bg-background flex justify-center items-center'>
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='w-4/5 h-full flex flex-col justify-start items-start px-10 overflow-y-scroll'>
        <Logo />
        <GetTab selectedTab={selectedTab} />
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
