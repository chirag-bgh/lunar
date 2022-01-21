// Modal
// import { useState } from "react";
import { useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const SettingBackend = ({
  callback,
  webhook,
}: {
  callback: string
  webhook: string
}) => {
  const { user, setUserData } = useMoralis()
  const { data } = useMoralisQuery('Products', (query) =>
    query.equalTo('user', user)
  )
  const { data: inv } = useMoralisQuery('Invoices', (query) =>
    query.equalTo('user', user?.id)
  )

  return (
    <button
      onClick={() => {
        setUserData({
          callbackURL: callback,
          webhookURL: webhook,
        })
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].save({ callback_url: callback, webhook_url: webhook })
        }
        for (let i = 0, len = inv.length; i < len; i++) {
          inv[i].save({ callback_url: callback, webhook_url: webhook })
        }
        ////console.log('Data Saved: ', data)
        //console.log("Inv Saved: ", inv);
      }}
      className='w-72 h-9 bg-primary rounded-md flex justify-center items-center font-semibold cursor-pointer'
    >
      Set Configuration
    </button>
  )
}

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
        if (user) {
          setUserData({
            ethEnabled: ethEnabled,
            maticEnabled: maticEnabled,
          })
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
