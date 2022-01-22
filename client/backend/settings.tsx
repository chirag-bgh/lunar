// Modal
// import { useState } from "react";
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { cwsave } from '../API/cwconfig'

export const SettingBackend = ({
  callback,
  webhook,
}: {
  callback: string
  webhook: string
}) => {
  const { user } = useMoralis()
  
  let address = {'callback_url':callback,"webhook_url":webhook}


  return (
    <button
      onClick={() => {
        cwsave({
          address: address,
          token: user?.get('token'),
        })
        ////console.log('Data Saved: ', data)
        //console.log("Inv Saved: ", inv);
      }}
      className='w-72 h-9 bg-primary rounded-md flex justify-center items-center font-semibold cursor-pointer'
    >
      Set Configuration
    </button>
  )
}

import { currencysave } from '../API/accepted_currencies'

export const SaveCurrencyConfig = ({
  ethEnabled,
  maticEnabled,
}: {
  ethEnabled: boolean
  maticEnabled: boolean
}) => {
  const { user, setUserData } = useMoralis()

  const [currenciesSaved, setCurrenciesSaved] = useState(false)
  const [error, setError] = useState(null)
  
  


  useEffect(() => {
    return () => {
      setCurrenciesSaved(false)
      setError(null)
    }
  }, [])

  return (
    <button
      onClick={async () => {
        let x = []
        if(ethEnabled){
          x.push('ETH')
        }
      
        if(maticEnabled){
          x.push("MATIC")
        }
        // setUserData({
        //   ethEnabled: ethEnabled,
        //   maticEnabled: maticEnabled,
        // })
        if (user) {
          currencysave({address:x,token:user?.get('token')})
            .then(() => {
              setCurrenciesSaved(true)
            })
            .catch((err) => {
              setError(err)
            })
        } else {
          console.log('user is null')
        }
      }}
      className='w-72 h-9 mt-5 bg-primary rounded-md flex justify-center items-center font-semibold cursor-pointer'
    >
      {!currenciesSaved ? 'Save' : error ? 'An Error Occured!' : 'Saved Data!'}
    </button>
  )
}
