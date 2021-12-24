// Components
import Sidebar from './Sidebar'
import Overview from './Tabs/Overview/Overview'
import Transactions from './Tabs/Transactions'
import Products from './Tabs/Products'
import Subscriptions from './Tabs/Subscriptions'
import Payouts from './Tabs/Payouts'
import Settings from './Tabs/Settings'
import { UserChecker } from '../Auth/AuthManager'

// Icons
import { IoMdMoon } from 'react-icons/io'

// Hooks
import { useState } from 'react'
import Demographics from './Tabs/Demographics'

const Dashboard = ({
  openModal,
  openWalletModal,
}: {
  openModal: () => void
  openWalletModal: () => void
}) => {
  const [selectedTab, setSelectedTab] = useState('Overview')
  const [balance, setBalance] = useState('Loading..')
  const [fetched, setFetched] = useState(false)

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
      case 'Payouts':
        return (
          <Payouts openWalletModal={openWalletModal} setFetched={setFetched} />
        )
      case 'Demographics':
        return <Demographics />
      case 'Settings':
        return <Settings />
      default:
        return <Overview />
    }
  }

  return (
    <div className='w-screen h-screen bg-background flex justify-center items-center'>
      <UserChecker setBalance={setBalance} setFetched={setFetched} />
      <Sidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        balance={balance}
        setBalance={setBalance}
        fetched={fetched}
        setFetched={setFetched}
      />
      <div className='w-4/5 h-full flex flex-col justify-start items-start px-10 overflow-y-auto'>
        <Logo className='' />
        <GetTab selectedTab={selectedTab} openModal={openModal} />
      </div>
    </div>
  )
}

export default Dashboard

export const Logo = ({ className }: { className: string }) => {
  return (
    <div
      className={`w-full flex justify-center items-center my-4 ${className}`}
    >
      <IoMdMoon className='text-white text-3xl mr-2' />
      <p className='font-medium text-xl pt-1'>lunar</p>
    </div>
  )
}
