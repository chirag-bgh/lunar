// Modal
import { useState } from 'react'
// import { useMoralis } from 'react-moralis'
import { SettingBackend } from '../../../backend/settings'

const Settings = () => {
  // const { user, setUserData } = useMoralis()

  const [callback, setcallback] = useState('')
  const [webhook, setwebhook] = useState('')

  return (
    <div className='w-full h-3/4'>
      <h1 className='text-3xl underline font-medium'>Settings</h1>
      <div className='flex flex-col w-full h-full justify-center items-center'>
        <div className='urls flex flex-col justify-center items-start gap-4 mt-10 bg-dark p-10 rounded-lg'>
          <h1 className='font-display text-white font-medium'>
            Callback URL:{' '}
          </h1>
          <input
            className='h-9 w-72 bg-white rounded-md text-black text-base pl-2 outline-none mb-3'
            type='text'
            placeholder='Enter Callback URL here'
            onChange={(e) => setcallback(e.target.value)}
          ></input>
          <h1 className='font-display text-white font-medium'>Webhook URL: </h1>
          <input
            className='h-9 w-72 bg-white rounded-md text-black text-base pl-2 outline-none mb-10'
            type='text'
            placeholder='Enter Webhook URL here'
            onChange={(e) => setwebhook(e.target.value)}
          ></input>
          <SettingBackend callback={callback} webhook={webhook} />
        </div>
      </div>
    </div>
  )
}

export default Settings
