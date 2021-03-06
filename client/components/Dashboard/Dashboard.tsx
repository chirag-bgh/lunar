// Components
import Sidebar from './Sidebar'
import Overview from './Tabs/Overview/Overview'
import Transactions from './Tabs/Transactions'
import Products from './Tabs/Products'
import Subscriptions from './Tabs/Subscriptions'
import Payouts from './Tabs/Payouts'
import Settings from './Tabs/Settings/Settings'
import CryptoJS from 'crypto-js'

// Hooks
import { memo, useEffect, useState } from 'react'
import Demographics from './Tabs/Demographics'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { MdOutlineErrorOutline } from 'react-icons/md'

const Dashboard = ({
  openModal,
  openWalletModal,
}: {
  openModal: () => void
  openWalletModal: () => void
}) => {
  const { user, setUserData, web3, isWeb3Enabled } = useMoralis()
  // const { switchNetwork, chainId } = useChain()

  const [selectedTab, setSelectedTab] = useState('Overview')
  const [balance, setBalance] = useState('Loading')
  const [fetched, setFetched] = useState(false)

  const isAuthenticated = user?.get('isAuthenticated')

  useMoralisQuery('PolygonTransactions', (query) => query, [], {
    live: true,
    onLiveCreate: (entity, all) => {
      setFetched(false)
      return [...all, entity]
    },
  })

  useEffect(() => {
    // For Polygon Mumbai
    // if (chainId !== '0x13881') {
    //   switchNetwork('0x13881')
    // }

    // For Ropsten Testnet
    // if (chainId !== '0x3') {
    //   switchNetwork('0x3')
    // }

    if (user?.get('encryptedKey') === undefined) {
      let x = web3?.eth.accounts.create()
      let encryptedKey = CryptoJS.AES.encrypt(
        x?.privateKey as string,
        process.env.NEXT_PUBLIC_PASSWORD as string
      ).toString()
      if (user && isAuthenticated) {
        setUserData({
          managed_account_pub: x?.address,
          encryptedKey: encryptedKey,
        })
      }
    }
    let successMsgObj = document.getElementById('success-msg')
    successMsgObj !== null ? (successMsgObj.style.opacity = '0') : null
  }, [user, setUserData, web3, isWeb3Enabled])

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

  // if(!fetched){
  //   return(<h3>sdf;lakj;dclvKAJ</h3>)
  // }

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
      {/* <IoMdMoon className='text-white text-3xl mr-2' /> */}
      <p id='logo_top' className='font-medium text-xl pt-1'>
        <span className='font-bold'>Lunar</span>Pay Beta
      </p>
      <div className='absolute w-1/2 transition-all' id='success-msg'>
        <div className='success-msg justify-center items-center w-3/4 mt-12 top-0 transition-transform flex'>
          <MdOutlineErrorOutline className='mr-2'></MdOutlineErrorOutline>
          Product created successfully
        </div>
      </div>
    </div>
  )
}
