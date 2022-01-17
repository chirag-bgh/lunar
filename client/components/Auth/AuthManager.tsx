import { useMoralis } from 'react-moralis'
import { useState } from 'react'
// Spinner
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import router from 'next/router'
import { ethers } from 'ethers'
// import { json } from 'stream/consumers

const AuthenticateButton = () => {
  const { authenticate } = useMoralis()
  const [called, setcalled] = useState(false)

  return (
    <div>
      <button
        // onClick={() => {
        //   authenticate({
        //     onSuccess: async (user) => {
        //       console.log('Authenticated User!: ', user)
        //       setcalled(true)
        //       router.push('/dashboard')
        //     },
        //     onError: (err) => {
        //       console.log('Failed to Authenticate User ->', err)
        //     },
        //   })
        // }}
        className='rounded-sm flex justify-center items-center font-medium font-display cursor-pointer text-lg md:text-md text-gray-500'
      >
        {!called ? (
          <div>
            <span>Authenticate</span>
            <br className='block md:hidden' /> <span>(Coming Soon)</span>
          </div>
        ) : (
          <div className='flex justify-center items-center '>
            <span>Authenticating </span>
            <Loader type='Puff' color='white' height={20} width={30} />
          </div>
        )}
      </button>
    </div>
  )
}

const LogoutButton = () => {
  const { logout } = useMoralis()

  return (
    <button
      onClick={async () => {
        await logout()
      }}
    >
      Logout
    </button>
  )
}

export async function ensresolver({
  address,
  setAddr,
  setavtr,
}: {
  address: string
  setAddr: any
  setavtr: any
}) {
  const provider = ethers.getDefaultProvider()
  let ensname = await provider.lookupAddress(address)
  if (ensname == null) {
    setAddr(address)
  } else {
    setAddr(ensname as string)
    let avatar = await provider.getAvatar(ensname)
    if (avatar != null) {
      setavtr(avatar)
    }
  }
  return 'done'
}

export { AuthenticateButton, LogoutButton }
