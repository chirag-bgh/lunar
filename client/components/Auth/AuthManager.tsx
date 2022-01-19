import { useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
// Spinner
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import router from 'next/router'
import { ethers } from 'ethers'
// import { json } from 'stream/consumers


export async function usergetter() {

}

const AuthenticateButton = () => {
  const { authenticate } = useMoralis()
  const [provider, setProvider] = useState<any>(null)
  const [called, setcalled] = useState(false)
  const [address,setaddress] = useState('')

  useEffect(() => {
    let _provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = _provider?.getSigner()
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: any) => {
        console.log('accounts: ', accounts)
      })
    // if (signer) setAuthenticated(true)
    setProvider(_provider)

    // Reload page on chain change
    window.ethereum.on('chainChanged', (chainId: any) => {
      window.location.reload()
    })
  }, [])

  const connectWithMetamask = async () => {
    if (!provider || provider === undefined) return
    await provider?.send('eth_requestAccounts', [])
    const signer = provider?.getSigner()
    console.log('Account:', await signer?.getAddress())
    setaddress(await signer?.getAddress())
    router.push('/dashboard')
  }

  return (
    <div>
      <button
        onClick={() => {
          if (!window.ethereum.isConnected()) {
            connectWithMetamask()
            setcalled(true)
          } else {
            setcalled(true)
            router.push('/dashboard')
          }
        }}
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
