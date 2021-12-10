// Modal
// import { useState } from "react";
import { useMoralis } from 'react-moralis'

export const SettingBackend = ({
  callback,
  webhook,
}: {
  callback: string
  webhook: string
}) => {
  const { user, setUserData } = useMoralis()

  return (
    <button
      onClick={() => {
        setUserData({
          callbackURL: callback,
          webhookURL: webhook,
        })
        console.log('User: ', user)
      }}
      className='px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer'
    >
      Set Configuration
    </button>
  )
}
