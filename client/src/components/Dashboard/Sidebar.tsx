import { BsCash, BsArchive, IoReload, BiDollar } from 'react-icons/all'

const Sidebar = () => {
  return (
    <div className='w-1/5 h-full shadow-sidebar flex flex-col justify-start items-center gap-4'>
      <UserAccount />
      <Balance />
      <Overview />
    </div>
  )
}

export default Sidebar

const UserAccount = () => {
  return (
    <div className='w-5/6 h-16 flex justify-start items-center gap-4'>
      <div className='h-full flex justify-center items-center'>
        <img
          src='/images/profile_pic.png'
          alt='Profile'
          className='w-10 h-10'
        />
      </div>
      <div className='flex justify-center items-center flex-col h-full max-w-3/4 truncate'>
        <h2 className='text-white text-3xl'>Dashboard</h2>
        <p className='text-white text-sm font-extralight'>
          0x335301C43a5319fd890
        </p>
      </div>
    </div>
  )
}

const Balance = () => {
  return (
    <div className='w-5/6 h-24 rounded-lg bg-dark flex flex-col justify-center items-center'>
      <p className='text-white text-md'>Balance</p>
      <h2 className='text-white text-3xl font-semibold'>1 ETH</h2>
    </div>
  )
}

const Overview = () => {
  return (
    <div className='w-5/6 h-60 rounded-lg bg-dark flex flex-col justify-start items-center'>
      <div className='h-1/5 w-full bg-primary rounded-t-lg flex justify-center items-center'>
        <p className='text-black text-lg font-medium'>Overview</p>
      </div>
      <div className=' h-1/5 w-full flex justify-start items-center gap-3'>
        <BsCash className='text-white text-xl ml-3' />
        <p className='text-white text-lg'>Transactions</p>
      </div>
      <div className=' h-1/5 w-full flex justify-start items-center gap-3'>
        <BsArchive className='text-white text-xl ml-3' />
        <p className='text-white text-lg'>Products</p>
      </div>
      <div className=' h-1/5 w-full flex justify-start items-center gap-3'>
        <IoReload className='text-white text-xl ml-3' />
        <p className='text-white text-lg'>Subscription Plans</p>
      </div>
      <div className=' h-1/5 w-full flex justify-start items-center gap-3'>
        <BiDollar className='text-white text-xl ml-3' />
        <p className='text-white text-lg'>Payouts</p>
      </div>
    </div>
  )
}
