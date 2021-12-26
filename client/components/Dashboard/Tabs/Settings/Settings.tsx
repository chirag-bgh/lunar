// Modal
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import {
  SaveCurrencyConfig,
  SettingBackend,
} from '../../../../backend/settings'

import { Checkbox } from './Utils'

const Settings = () => {
  const [callback, setcallback] = useState('')
  const [webhook, setwebhook] = useState('')

  const { user } = useMoralis()

  const [ethEnabled, setEthEnabled] = useState(user?.get('ethEnabled'))
  const [maticEnabled, setMaticEnabled] = useState(user?.get('maticEnabled'))

  return (
    <div className='w-full h-full mb-14'>
      <h1 className='text-3xl underline font-medium'>Settings</h1>

      {/* Supported Currencies */}
      <div className='flex flex-col w-full justify-start items-start mt-10'>
        <h1 className='text-2xl'>Supported Currencies</h1>
        <div className='urls flex flex-col justify-center items-start gap-4 mt-5 bg-dark p-10 rounded-lg'>
          <Checkbox
            state={ethEnabled}
            onChange={setEthEnabled}
            text='ETHEREUM'
          />
          <Checkbox
            state={maticEnabled}
            onChange={setMaticEnabled}
            text='MATIC'
          />
          <SaveCurrencyConfig
            ethEnabled={ethEnabled}
            maticEnabled={maticEnabled}
          />
        </div>
      </div>

      {/* Setup Webhook and Callbacks */}
      <div className='flex flex-col w-full justify-start items-start mt-10'>
        <h1 className='text-2xl'>Setup Webhook and Callbacks</h1>
        <div className='urls flex flex-col justify-center items-start gap-4 mt-5 bg-dark p-10 rounded-lg'>
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
