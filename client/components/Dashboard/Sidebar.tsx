import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from 'react-moralis'

// Icons
import { BsFileText, BsCash, BsArchive, BsPeopleFill } from 'react-icons/bs'
import { BiDollar } from 'react-icons/bi'
import { RiSettingsFill } from 'react-icons/ri'
import { IoReload } from 'react-icons/io5'
import CountUp from 'react-countup'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { ensresolver } from '../Auth/AuthManager'
import { walletgetter } from '../../API/wallet'
const Sidebar = ({
  selectedTab,
  setSelectedTab,
  balance,
  setBalance,
  fetched,
  setFetched,
}: {
  selectedTab: string
  setSelectedTab: (arg: string) => void
  balance: string
  setBalance: (arg: string) => void
  fetched: boolean
  setFetched: (arg: boolean) => void
}) => {
  const { logout, user } = useMoralis()
  const router = useRouter()

  useEffect(() => {
    if (user == null) {
      console.log('User is null')
    }
  }, [])

  return (
    <div className='w-80 h-screen shadow-sidebar flex flex-col justify-between items-center gap-6'>
      <UserAccount />
      <Balance
        balance={balance}
        setBalance={setBalance}
        fetched={fetched}
        setFetched={setFetched}
      />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {/* Sign Out Button */}
      <div
        className=' bg-red-500 mt-auto mb-4 cursor-pointer p-3 w-5/6 rounded-lg flex justify-center'
        onClick={() => {
          user?.save({token:'null'}).then(() => {
            logout().then(() => {
              router.push('/')
              // alert('Wallet Disconnected')
            })
          }
          )
           }}
      >
        <h1 className='font-semibold font-display text-md'>Sign Out</h1>
      </div>
      
    </div>
  )
}

export default Sidebar

const Tabs = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string
  setSelectedTab: (arg: string) => void
}) => {
  return (
    <div className='w-5/6 h-80 rounded-lg bg-dark flex flex-col justify-start items-center font-display cursor-pointer transition ease-in-out'>
      <Tab
        tab='Overview'
        icon={<BsFileText className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tab
        tab='Transactions'
        icon={<BsCash className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tab
        tab='Products'
        icon={<BsArchive className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tab
        tab='Subscription Plans'
        icon={<IoReload className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tab
        tab='Payouts'
        icon={<BiDollar className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tab
        tab='Demographics'
        icon={<BsPeopleFill className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Tab
        tab='Settings'
        icon={<RiSettingsFill className='text-current text-xl' />}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </div>
  )
}

const Tab = ({
  tab,
  icon,
  selectedTab,
  setSelectedTab,
}: {
  tab: string
  icon: any
  selectedTab: string
  setSelectedTab: (arg: string) => void
}) => {
  return (
    <div
      onClick={() => setSelectedTab(tab)}
      className={
        'h-2/5 w-full flex items-center gap-3 px-3 transition-all ' +
        (selectedTab === tab
          ? `bg-primary text-dark justify-center ${
              tab === 'Overview'
                ? 'rounded-t-lg'
                : tab === 'Settings'
                ? 'rounded-b-lg'
                : 'rounded-none'
            }`
          : 'text-white')
      }
    >
      {icon}
      <p className='text-lg text-current font-medium '>{tab}</p>
      <div></div>
    </div>
  )
}

const truncate = (phrase: string, n: number) => {
  return phrase !== undefined
    ? phrase.length > n
      ? phrase.substr(0, n - 1) + '...'
      : phrase
    : null
}
//0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3
const UserAccount = () => {
  const { user } = useMoralis()
  const [addr, setAddr] = useState('')
  const [avtr,setavtr] = useState(`https://avatars.dicebear.com/api/jdenticon/${user?.attributes.ethAddress}.svg`)
  ensresolver({ address: user?.attributes.ethAddress, setAddr: setAddr, setavtr: setavtr })
  return (
    <div className='h-16 pt-4 flex justify-start items-center gap-4'>
      <div className='h-full flex justify-center items-center'>
        <img
          src={avtr}
          alt='Profile'
          className='w-10 h-10'
        />
      </div>
      <div className='flex justify-center items-start flex-col h-full max-w-3/4 truncate'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
        <p className=' text-gray-400 text-sm font-display'>
          {truncate(addr, 19)}
        </p>
      </div>
    </div>
  )
}

import { usergetter } from '../../API/users'

const Balance = ({
  balance,
  setBalance,
  fetched,
  setFetched,
}: {
  balance: string
  setBalance: (arg: string) => void
  fetched: boolean
  setFetched: (arg: boolean) => void
}) => {
  const { web3 } = useMoralis()
  const Web3Api = useMoralisWeb3Api()

  const {user} = useMoralis()

  const { fetch, data } = useMoralisWeb3ApiCall(
    Web3Api.account.getNativeBalance,
    {
      address: user?.get('managed_account_pub'),
      chain: 'ropsten',
    }
  )

  console.log("Address: ",user?.get('managed_account_pub'))

  useEffect(() => {
    if (data !== null) {
      setBalance(web3?.utils.fromWei(data.balance)+'')
      //console.log('balance: ', balance)
    }
    if (!fetched) {
      fetch()
      setFetched(true)
    }
  }, [data, fetch, fetched, balance, web3?.utils, setBalance, setFetched])

  return (
    <div className='w-5/6 h-24 rounded-lg bg-dark flex flex-col justify-center items-center'>
      <p className='text-md'>Balance</p>
      <h2 className='text-3xl font-semibold'>
        <div className='flex justify-center items-center gap-2'>
          <pre id='balance'>
            {balance.substring(0,4) + ' ETH'}
            {/* <CountUpMemo
              end={Number(balance.split(' ETH')[0])}
              decimals={2}
              duration={1}
              suffix=' ETH'
            /> */}
          </pre>
        </div>
      </h2>
    </div>
  )
}

const CountUpMemo = (props: any) => {
  const prevValueRef = useRef()
  useEffect(() => {
    prevValueRef.current = props.end
  })
  return <CountUp start={prevValueRef.current} end={props.end} {...props} />
}
