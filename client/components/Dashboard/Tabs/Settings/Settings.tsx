// Modal
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import {
  SaveCurrencyConfig,
  SettingBackend,
} from '../../../../backend/settings'

import { Checkbox } from './Utils'
import { currencygetter } from '../../../../API/accepted_currencies'
import { cwgetter } from '../../../../API/cwconfig'
import { cwsave } from '../../../../API/cwconfig'

const Settings = () => {
  const [callback, setcallback] = useState('')
  const [webhook, setwebhook] = useState('')
  const [apiVisible, setApiVisible] = useState(false)

  const toggleApiVisible = () => {
    setApiVisible(!apiVisible)
  }

  const { user } = useMoralis()

  const [ethEnabled, setEthEnabled] = useState<any>(null)
  const [maticEnabled, setMaticEnabled] = useState<any>(true)
  const [usdtEnabled, setusdtEnabled] = useState<any>(null)
  const [accounts, setAccounts] = useState<string[]>([])
  const [accfetched, setaccfetched] = useState(false)
  const [setting, setsetting] = useState(false)
  //WEBHOOK CONFIG
  const [cwfetched, setcwfetched] = useState(false)
  const [cwconfig, setcwconfig] = useState<any>({})
  const [cwset, setcwset] = useState(false)
  const [cwgot, setcwgot] = useState(false)

  let token = user?.get('token')

  if (!accfetched) {
    currencygetter({ setAcc, token })
    setaccfetched(true)
  }
  function setAcc({ z }: { z: any }) {
    setAccounts(z)
  }

  if (accfetched && !setting) {
    if (accounts.includes('ETH')) {
      setEthEnabled(true)
      setsetting(true)
    }
    if (accounts.includes('MATIC')) {
      setMaticEnabled(true)
      setsetting(true)
    }
    if (accounts.includes('USDT')) {
      setusdtEnabled(true)
      setsetting(true)
    }
  }

  if (!cwfetched) {
    cwgetter({ setAcc: setCW, token })
    setcwfetched(true)
  }
  function setCW({ z }: { z: any }) {
    setcwconfig(z)
    setcwgot(true)
  }

  if (cwgot && !cwset) {
    if (cwconfig['callback_url'] != 'null') {
      setcallback(cwconfig['callback_url'])
      setcwset(true)
    }
    if (cwconfig['webhook_url'] != 'null') {
      setwebhook(cwconfig['webhook_url'])
      setcwset(true)
    }
  }

  return (
    <div className='w-full h-full mb-14'>
      <h1 className='text-3xl underline font-medium'>Settings</h1>
      {/* Supported Currencies */}
      <div className='flex flex-col w-full justify-start items-start mt-10'>
        <h1 className='text-2xl'>Supported Currencies (Coming Soon)</h1>
        <div className='urls flex flex-col justify-center items-start gap-4 mt-5 bg-dark p-10 rounded-lg'>
          <Checkbox
            state={ethEnabled}
            onChange={setEthEnabled}
            text='ETHEREUM'
            disabled={true}
          />
          <Checkbox
            state={maticEnabled}
            onChange={setMaticEnabled}
            text='MATIC'
            disabled={true}
          />
          <Checkbox
            state={usdtEnabled}
            onChange={setusdtEnabled}
            text='USDT'
            disabled={true}
          />
          <SaveCurrencyConfig
            ethEnabled={ethEnabled}
            maticEnabled={maticEnabled}
            usdtEnabled={usdtEnabled}
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
            value={callback}
            placeholder='Enter Callback URL here'
            onChange={(e) => setcallback(e.target.value)}
          ></input>
          <h1 className='font-display text-white font-medium'>Webhook URL: </h1>
          <input
            className='h-9 w-72 bg-white rounded-md text-black text-base pl-2 outline-none mb-10'
            type='text'
            placeholder='Enter Webhook URL here'
            value={webhook}
            onChange={(e) => setwebhook(e.target.value)}
          ></input>
          <SettingBackend callback={callback} webhook={webhook} />
        </div>
      </div>
      <div className='flex flex-col w-full justify-center items-center mt-16 pb-24'>
        <div className='flex h-6'>
          <button
            className={
              'w-72 h-9 bg-red-500 flex justify-center items-center font-semibold cursor-pointer text-white rounded'
            }
            onClick={() => toggleApiVisible()}
          >
            {apiVisible ? 'Hide API Key' : 'Show API Key'}
          </button>
          <h1
            onClick={() =>
              navigator.clipboard
                .writeText(user?.get('token'))
                .then(() => alert('API Key has been copied to clipboard'))
            }
            className={
              apiVisible
                ? 'bg-dark px-2  h-9 flex justify-center items-center rounded-r-lg cursor-pointer transition-all text-white font-code'
                : 'hidden'
            }
          >
            {user?.get('token')}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Settings
