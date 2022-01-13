import { useMoralis } from 'react-moralis'
import { useState } from 'react'
// Spinner
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import router from 'next/router'
import { ethers } from "ethers";
// import { json } from 'stream/consumers

const AuthenticateButton = () => {
  const { authenticate } = useMoralis()
  const [called, setcalled] = useState(false)

  return (
    <div>
      <button
        onClick={() => {

          authenticate({
            onSuccess: async (user) => {
              setcalled(true)
              router.push('/dashboard')
            },
            onError: (err) => {
              console.log('Failed to Authenticate User ->', err)
            },
          })
        }}
        className='rounded-sm flex justify-center items-center font-medium font-display cursor-pointer text-lg md:text-md'
      >
        {!called ? (
          <span>Authenticate</span>
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
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  let ensname = await provider.lookupAddress(address);
  if(ensname != null){
    let resolver:any = await provider.getResolver(ensname as string);
    let avatar = await resolver.getText("avatar");
    console.log("Avatar: ", avatar)
    if(avatar != null){
      setavtr(avatar)
    }
    
  }
  
  let url = `https://deep-index.moralis.io/api/v2/resolve/${address}/reverse`
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)

  xhr.setRequestHeader(
    'X-API-Key',
    'd1ToAmJMpQUZTjrtN8CgbCTcwerAEKddXTY3qSUISeFZxjNfUKHZwDpVNAIM3w9I'
  )
  xhr.setRequestHeader('accept', 'application/json')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status)
      console.log(xhr.responseText)
      let x = JSON.parse(xhr.responseText)
      if (x.name == null) {
        setAddr(address)
      } else {
        setAddr(x.name as string)
      }
    }
  }

  xhr.send()
  return 'done'
}

export { AuthenticateButton, LogoutButton }
