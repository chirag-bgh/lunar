import { MoralisProvider, useMoralis } from 'react-moralis'
import Landing from '../components/Landing'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

declare const window: any

function App() {
  return (
    <MoralisProvider
      // Polygon Mumbai
      appId={process.env.NEXT_PUBLIC_APP_ID as string}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
    >
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap'
        />
        <link rel='icon' href='/logo.png' />
        <meta
          name='description'
          content='Crypto Payments Made Easy with LunarPay.'
        />
        <title>Lunar Pay</title>
      </Head>
      <Content />
    </MoralisProvider>
  )
}

function Content() {
  const router = useRouter()

  const { enableWeb3, isWeb3Enabled, user } = useMoralis()

  const [alertUser, setAlertUser] = useState(false)

  const isAuthenticated = user ? user.get('isAuthenticated') : false

  useEffect(() => {
    // Check if Metamask is installed
    if (window.ethereum && window.ethereum.isMetaMask) {
      // Metamask is installed
      // console.log('Metamask is installed')
    } else {
      // Metamask is not installed
      console.log('Please install MetaMask!')
      setAlertUser(true)
    }

    // Check if web3 is enabled
    if (!isWeb3Enabled) {
      // Enable web3
      enableWeb3()
    }

    if (isAuthenticated) {
      router.push('/dashboard')
    }
   //thenticated: ', isAuthenticated)
  }, [enableWeb3, isWeb3Enabled])

  return <Landing alertUser={alertUser} />
}

export default App
