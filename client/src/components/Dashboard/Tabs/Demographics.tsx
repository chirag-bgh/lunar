import {
  GetCities,
  GetCountries,
  GetUserLeaderboard,
  GetUsers,
} from '../../../backend/Demographics'

const Demographics = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col justify-between items-start mb-16'>
        <h2 className='text-3xl underline font-medium'>Demographics</h2>
      </div>
      <div className='flex flex-col justify-start items-start w-full gap-4'>
        <div className='flex justify-start items-stretch gap-4 w-full'>
          <div className='bg-dark w-40 py-4 min-h-fit max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-evenly items-center'>
            <p className='my-2 text-xl'>Total Users</p>
            <GetUsers />
          </div>
          <div className='bg-dark w-80 py-4 max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center'>
            <p className='my-2 text-xl'>Users by Country</p>
            <GetCountries />
            <div></div>
          </div>
          <div className='bg-dark w-80 py-4 max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center'>
            <p className='my-2 text-xl'>Users by City</p>
            <GetCities />
            <div></div>
          </div>
        </div>
        <div className='flex justify-start items-start gap-4 w-full'>
          <div
            style={{ width: '52rem' }}
            className='bg-dark py-4 max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center'
          >
            <p className='my-2 text-xl'>Top Customers</p>
            <GetUserLeaderboard />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demographics
