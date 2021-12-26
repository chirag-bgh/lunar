import { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import ProductModal from '../components/ProductModal'
import WalletModal from '../components/WalletModal'
import { MoralisProvider, useMoralis } from 'react-moralis'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Landing from '../components/Landing'

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
      </Head>
      <DashboardPage />
    </MoralisProvider>
  )
}

const DashboardPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis()

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
      //   console.log('Enabling web3')
      enableWeb3()
    }
  }, [enableWeb3, isWeb3Enabled, isAuthenticated])

  function openModal() {
    setIsOpen(true)
  }

  function openWalletModal() {
    setWalletModalIsOpen(true)
  }

  return (
    <div style={{ filter: modalIsOpen ? 'brightness(0.5) blur(5px)' : 'none' }}>
      {isWeb3Enabled && isAuthenticated ? (
        <Dashboard openModal={openModal} openWalletModal={openWalletModal} />
      ) : null}
      <ProductModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <WalletModal
        walletModalIsOpen={walletModalIsOpen}
        setWalletModalIsOpen={setWalletModalIsOpen}
      />
    </div>
  )
}

export default Provider
