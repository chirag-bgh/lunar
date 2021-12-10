// Modal
import { useState } from 'react'
// import { useMoralis } from 'react-moralis'
import { SettingBackend } from '../../../backend/settings'

const Settings = () => {
  // const { user, setUserData } = useMoralis()

  const [callback, setcallback] = useState('')
  const [webhook, setwebhook] = useState('')

  return (
    <div className='w-full'>
      <h1 className='text-3xl underline font-medium'>Settings</h1>
      <div className='flex flex-col w-full h-full justify-center items-center'>
        <div className='urls h-24 mt-10 '>
          <h1 className='font-display text-white font-medium'>
            Callback URL:{' '}
          </h1>
          <input
            className='h-10 w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm'
            type='text'
            placeholder='Enter Callback URL here'
            onChange={(e) => setcallback(e.target.value)}
          ></input>
          <h1 className='font-display text-white font-medium'>Webhook URL: </h1>
          <input
            className='h-10 w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm'
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
