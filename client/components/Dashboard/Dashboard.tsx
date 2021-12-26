// Components
import Sidebar from './Sidebar'
import Overview from './Tabs/Overview/Overview'
import Transactions from './Tabs/Transactions'
import Products from './Tabs/Products'
import Subscriptions from './Tabs/Subscriptions'
import Payouts from './Tabs/Payouts'
import Settings from './Tabs/Settings'
import CryptoJS from 'crypto-js'

// Icons
import { IoMdMoon } from 'react-icons/io'

// Hooks
import { memo, useEffect, useState } from 'react'
import Demographics from './Tabs/Demographics'
import { useChain, useMoralis, useMoralisQuery } from 'react-moralis'

const Dashboard = ({
  openModal,
  openWalletModal,
}: {
  openModal: () => void
  openWalletModal: () => void
}) => {
  const {
    user,
    setUserData,
    web3,
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
  } = useMoralis()
  const { switchNetwork, chainId } = useChain()

  const [selectedTab, setSelectedTab] = useState('Overview')
  const [balance, setBalance] = useState('Loading..')
  const [fetched, setFetched] = useState(false)

  useMoralisQuery('PolygonTransactions', (query) => query, [], {
    live: true,
    onLiveCreate: (entity, all) => {
      setFetched(false)
      return [...all, entity]
    },
  })

  useEffect(() => {
    console.log('web3 enabled is ', isWeb3Enabled)

    // For Polygon Mumbai
    // if (chainId !== '0x13881') {
    //   switchNetwork('0x13881')
    // }

    // For Ropsten Testnet
    if (chainId !== '0x3') {
      switchNetwork('0x3')
    }

    if (user?.get('encryptedKey') === undefined) {
      let x = web3?.eth.accounts.create()
      let encryptedKey = CryptoJS.AES.encrypt(
        x?.privateKey as string,
        process.env.NEXT_PUBLIC_PASSWORD as string
      ).toString()
      if (user && isAuthenticated) {
        console.log('Saving user data')
        setUserData({
          managed_account_pub: x?.address,
          encryptedKey: encryptedKey,
        })
      }
    }
  }, [chainId, user, setUserData, web3, switchNetwork, isWeb3Enabled])

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

export default memo(Dashboard)

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
