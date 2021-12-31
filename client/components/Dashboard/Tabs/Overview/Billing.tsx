import { GetRevenue, GetTransactions } from '../../../../backend/Analytics'

const Billing = () => {
  return (
    <div className='flex justify-center items-center w-full mt-10'>
      <div className='flex flex-col items-center justify-center w-1/2 h-16 rounded-lg bg-primary'>
        <p className='text-black text-sm font-medium leading-5 revenue-btn'>REVENUE</p>
        <h2 className='text-black text-2xl font-semibold leading-none'>
          <GetRevenue />
        </h2>
      </div>
      <div className='flex flex-col items-center justify-center w-1/2 h-16 rounded-lg bg-dark transactions-btn'>
        <p className='text-sm font-light leading-5'>TRANSACTIONS</p>
        <h2 className='text-2xl font-semibold leading-none'>
          <GetTransactions />
        </h2>
      </div>
    </div>
  )
}

export default Billing
