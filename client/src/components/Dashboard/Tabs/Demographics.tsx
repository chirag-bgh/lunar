import { GetCities, GetCountries } from '../../../backend/Demographics'

const Demographics = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col justify-between items-start mb-16'>
        <h2 className='text-3xl underline font-medium'>Demographics</h2>
      </div>
      <div className='flex justify-start items-start gap-4'>
        <div className='bg-dark w-1/3 py-4 max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center'>
          <p className='mt-4 text-xl'>Users by Country</p>
          <GetCountries />
          <div></div>
        </div>
        <div className='bg-dark w-1/3 py-4 max-h-80 rounded-md border-2 border-gray-600 flex flex-col justify-between items-center'>
          <p className='mt-4 text-xl'>Users by City</p>
          <GetCities />
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Demographics
