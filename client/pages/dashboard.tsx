import { useEffect, useMemo, useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import ProductModal from '../components/ProductModal'
import WalletModal from '../components/WalletModal'
import { MoralisProvider, useMoralis } from 'react-moralis'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LoadingScreenAuthState } from '../components/LoadingScreen'

declare const window: any

function Provider() {
  return (
    <MoralisProvider
      // Polygon Mumbai and Ropsten Network
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
        <title>Lunar Dashboard</title>
      </Head>
      <DashboardPage />
    </MoralisProvider>
  )
}

const DashboardPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const { enableWeb3, isWeb3Enabled, user } = useMoralis()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    user === null ? false : true
  )

  const router = useRouter()

  useEffect(() => {
    // console.log('isAuthenticated: ', isAuthenticated)
    // console.log('isWeb3Enabled: ', isWeb3Enabled)

    // Check if Metamask is installed
    if (!(window.ethereum && window.ethereum.isMetaMask)) {
      // Metamask is not installed
      console.log('Please install MetaMask!')

      // Go to landing page
      router.push('/')
    }

    // Check if web3 is enabled
    if (!isWeb3Enabled) {
      // Enable web3
      enableWeb3()
    }
  }, [enableWeb3, isWeb3Enabled, isAuthenticated])

  useEffect(() => {
    setIsAuthenticated(user === null ? false : true)
  }, [user])

  function openModal() {
    setIsOpen(true)
  }

  function openWalletModal() {
    setWalletModalIsOpen(true)
  }

  return (
    <div style={{ filter: modalIsOpen ? 'brightness(0.5) blur(5px)' : 'none' }}>
      {isAuthenticated === true && isWeb3Enabled ? (
        <Dashboard openModal={openModal} openWalletModal={openWalletModal} />
      ) : (
        <LoadingScreenAuthState />
      )}
      <ProductModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <WalletModal
        walletModalIsOpen={walletModalIsOpen}
        setWalletModalIsOpen={setWalletModalIsOpen}
      />
    </div>
  )
}

export default Provider
