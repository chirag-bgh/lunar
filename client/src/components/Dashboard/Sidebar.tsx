// Icons
import {
  BsFileText,
  BsCash,
  BsArchive,
  IoReload,
  BiDollar,
} from 'react-icons/all'

const Sidebar = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string
  setSelectedTab: (arg: string) => void
}) => {
  return (
    <div className='w-80 h-screen shadow-sidebar flex flex-col justify-start items-center gap-6'>
      <UserAccount />
      <Balance />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {/* Sign Out Button */}
      <div className=' bg-red-500 mt-auto mb-4 cursor-pointer p-3 w-5/6 rounded-lg flex justify-center'>
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
    <div className='w-5/6 h-60 rounded-lg bg-dark flex flex-col justify-start items-center font-display cursor-pointer transition ease-in-out'>
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
        'h-1/5 w-full flex items-center gap-3 px-3 transition-all ' +
        (selectedTab === tab
          ? `bg-primary text-dark justify-center ${
              tab === 'Overview'
                ? 'rounded-t-lg'
                : tab === 'Payouts'
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

const UserAccount = () => {
  return (
    <div className='h-16 pt-4 flex justify-start items-center gap-4'>
      <div className='h-full flex justify-center items-center'>
        <img
          src='/images/profile_pic.png'
          alt='Profile'
          className='w-10 h-10'
        />
      </div>
      <div className='flex justify-center items-start flex-col h-full max-w-3/4 truncate'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
        <p className=' text-gray-400 text-sm font-display'>
          0x335301C43a5319fd890
        </p>
      </div>
    </div>
  )
}

const Balance = () => {
  return (
    <div className='w-5/6 h-24 rounded-lg bg-dark flex flex-col justify-center items-center'>
      <p className='text-md'>Balance</p>
      <h2 className='text-3xl font-semibold'>1 ETH</h2>
    </div>
  )
}
