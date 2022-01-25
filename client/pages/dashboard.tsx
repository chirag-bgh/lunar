import { useEffect, useMemo, useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import ProductModal from '../components/Modals/ProductModal'
import WalletModal from '../components/Modals/WalletModal'
import { MoralisProvider, useMoralis } from 'react-moralis'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { LoadingScreenAuthState } from '../components/LoadingScreen'
import { currencygetter } from '../API/accepted_currencies'

declare const window: any

function Provider() {
  return (
    <MoralisProvider
      // Polygon Mumbai and Ropsten Network
      appId={process.env.NEXT_PUBLIC_APP_ID as string}
      serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
    >
      <Head>
        <title>LunarPay Dashboard</title>
        <link rel='icon' href='/logo.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='Crypto Payments Made Easy with LunarPay.'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap'
        />
      </Head>
      <DashboardPage />
    </MoralisProvider>
  )
}

const DashboardPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const { enableWeb3, isWeb3Enabled, user } = useMoralis()

  const [acceptedCurrencies, setAcceptedCurrencies] = useState<string[]>([])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    user === null ? false : true
  )

  let token = user?.get('token')

  const setAcc = ({ z }: { z: any }) => {
    setAcceptedCurrencies(z)
  }

  useEffect(() => {
    if (modalIsOpen) {
      currencygetter({
        setAcc: setAcc,
        token: token,
      })

      console.log('accepted currencies: ', acceptedCurrencies)
    }
  }, [modalIsOpen])

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
    <div
      className='modal'
      style={{
        transform: modalIsOpen ? 'scale(1.009)' : 'none',
        filter: modalIsOpen ? 'brightness(0.5) blur(5px)' : 'none',
      }}
    >
      {isAuthenticated === true && isWeb3Enabled ? (
        <Dashboard openModal={openModal} openWalletModal={openWalletModal} />
      ) : (
        <LoadingScreenAuthState />
      )}
      <ProductModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        acceptedCurrencies={acceptedCurrencies}
      />
      <WalletModal
        walletModalIsOpen={walletModalIsOpen}
        setWalletModalIsOpen={setWalletModalIsOpen}
      />
    </div>
  )
}

export default Provider
