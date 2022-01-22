// Modal
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import {
  SaveCurrencyConfig,
  SettingBackend,
} from '../../../../backend/settings'

import { Checkbox } from './Utils'
import { currencygetter } from '../../../../API/accepted_currencies'

const Settings = () => {
  const [callback, setcallback] = useState('')
  const [webhook, setwebhook] = useState('')
  const [apiVisible, setApiVisible] = useState(false)

  const toggleApiVisible = () => {
    setApiVisible(!apiVisible)
  }

  const { user } = useMoralis()

  const [ethEnabled, setEthEnabled] = useState(null)
  const [maticEnabled, setMaticEnabled] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)
  const [setting, setsetting] = useState(false)

  if(!accfetched){
    currencygetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
  }

  console.log("Currency Settings: ",accounts)
  if(accfetched && !setting){
    if(accounts.includes('ETH')){
      setEthEnabled(true)
      setsetting(true)
    }
    if(accounts.includes('MATIC')){
      setMaticEnabled(true)
      setsetting(true)
    }
  }

console.log("Eth Enabled",ethEnabled)
console.log("Matic Enabled",maticEnabled)
console.log("Setting",setting)


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
          <Checkbox
            state={maticEnabled}
            onChange={setMaticEnabled}
            text='USDT'
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
      <div className='flex flex-col w-full justify-center items-center mt-16 pb-24'>
        <div className='flex h-6'>
        <button className={"w-72 h-9 bg-red-500 flex justify-center items-center font-semibold cursor-pointer text-white"} onClick={()=>toggleApiVisible()}>{apiVisible ? 'Hide API Key' : "Show API Key"}</button>
        <h1 onClick={() => navigator.clipboard.writeText(user?.get('token')).then(alert('API Key has been copied to clipboard'))} className={apiVisible ? 'block bg-dark px-2  h-9 flex justify-center items-center rounded-r-lg cursor-pointer transition-all text-white font-code' : 'hidden'}>{user.get('token')}</h1>
        
        </div>
        
      </div>
    </div>
  )
}

export default Settings
