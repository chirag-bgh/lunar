import {
  BsFileText,
  BsCash,
  BsArchive,
  IoReload,
  BiDollar,
} from 'react-icons/all'
import { useState } from 'react'

const Sidebar = () => {
  return (
    <div className='w-80 h-full shadow-sidebar flex flex-col justify-start items-center gap-6'>
      <UserAccount />
      <Balance />
      <Overview />
    </div>
  )
}

export default Sidebar

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

const Overview = () => {
  let [selected, setSelected] = useState(1)

  return (
    <div className='w-5/6 h-60 rounded-lg bg-dark flex flex-col justify-start items-center font-display cursor-pointer'>
      <div
        id='1'
        onClick={() => setSelected(1)}
        className={
          'h-1/5 w-full rounded-t-lg flex justify-start items-center gap-3 transition-all ' +
          (selected === 1 ? ' bg-primary text-dark gap-11 ' : ' text-white')
        }
      >
        <BsFileText className='text-current text-xl ml-3' />
        <p className='text-lg text-current font-medium'>Overview</p>
      </div>
      <div
        id='2'
        onClick={() => setSelected(2)}
        className={
          ' h-1/5 w-full flex justify-start items-center gap-3 transition-all ' +
          (selected === 2 ? ' bg-primary text-dark  gap-11' : ' text-white')
        }
      >
        <BsCash className='text-current text-xl ml-3' />
        <p className='text-current text-lg'>Transactions</p>
      </div>
      <div
        id='3'
        onClick={() => setSelected(3)}
        className={
          ' h-1/5 w-full flex justify-start items-center gap-3 transition-all ' +
          (selected === 3 ? ' bg-primary text-dark  gap-11' : ' text-white')
        }
      >
        <BsArchive className='text-current text-xl ml-3' />
        <p className='text-current text-lg'>Products</p>
      </div>
      <div
        id='4'
        onClick={() => setSelected(4)}
        className={
          ' h-1/5 w-full flex justify-start items-center gap-3 transition-all ' +
          (selected === 4 ? ' bg-primary text-dark gap-5' : ' text-white')
        }
      >
        <IoReload className='text-current text-xl ml-3' />
        <p className='text-current text-lg'>Subscription Plans</p>
      </div>
      <div
        id='5'
        onClick={() => setSelected(5)}
        className={
          ' h-1/5 w-full flex rounded-b-lg justify-start items-center gap-3 transition-all ' +
          (selected === 5 ? ' bg-primary text-dark  gap-11' : ' text-white')
        }
      >
        <BiDollar className='text-current text-xl ml-3' />
        <p className='text-current text-lg'>Payouts</p>
      </div>
    </div>
  )
}
