// Components
import Sidebar from './Sidebar'
import Overview from './Tabs/Overview/Overview'
import Transactions from './Tabs/Transactions'
import Products from './Tabs/Products'
import Subscriptions from './Tabs/Subscriptions'
import Payouts from './Tabs/Payouts'
import Customers from './Tabs/Customers'
import Settings from './Tabs/Settings'
import { UserChecker } from '../Auth/AuthManager'

// Icons
import { IoMdMoon } from 'react-icons/all'

// Hooks
import { useState } from 'react'

const Dashboard = ({ openModal }: { openModal: () => void }) => {
  const [selectedTab, setSelectedTab] = useState('Overview')

  function GetTab({
    selectedTab,
    openModal,
  }: {
    selectedTab: string
    openModal: () => void
  }) {
    switch (selectedTab) {
      case 'Overview':
        return <Overview />
      case 'Transactions':
        return <Transactions />
      case 'Products':
        return <Products openModal={openModal} />
      case 'Subscription Plans':
        return <Subscriptions />
      case 'Customers':
        return <Customers />
      case 'Payouts':
        return <Payouts />
      case 'Settings':
        return <Settings />
      default:
        return <Overview />
    }
  }

  return (
    <div className='w-screen h-screen bg-background flex justify-center items-center'>
      <UserChecker />
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='w-4/5 h-full flex flex-col justify-start items-start px-10 overflow-y-auto'>
        <Logo />
        <GetTab selectedTab={selectedTab} openModal={openModal} />
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
