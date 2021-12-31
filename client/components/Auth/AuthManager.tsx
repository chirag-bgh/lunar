import { useMoralis } from 'react-moralis'
import { useState } from 'react'
// Spinner
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import router from 'next/router'
import { json } from 'stream/consumers'

const AuthenticateButton = () => {
  const { authenticate } = useMoralis()
  const [called, setcalled] = useState(false)

  return (
    <div>
      <button
        onClick={() => {
          authenticate({
            onSuccess: async (user) => {
              console.log('Authenticated User!: ', user)
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
  const { logout, setUserData } = useMoralis()

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

export function ensresolver({address,setAddr}:{address:string,setAddr: any}) {
  let url = `https://deep-index.moralis.io/api/v2/resolve/${address}/reverse`
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("X-API-Key", "d1ToAmJMpQUZTjrtN8CgbCTcwerAEKddXTY3qSUISeFZxjNfUKHZwDpVNAIM3w9I");
  xhr.setRequestHeader("accept", "application/json");

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      let x = JSON.parse(xhr.responseText)
      if(x.name == null){
        setAddr(address)
      } else{
        setAddr(x.name as string)
      }
      console.log('x: ',x)
      
   }};

  xhr.send()
  return "done"
}



export { AuthenticateButton, LogoutButton }
