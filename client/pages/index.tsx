import { MoralisProvider, useMoralis } from 'react-moralis'
// import { TransferButton, DisplayTransaction } from './components/transfer'

// Components
// import Dashboard from './components/Dashboard/Dashboard'
// import Landing from './components/Landing'
// import ProductModal from './components/ProductModal'
// import WalletModal from './components/WalletModal'
import Landing from '../components/Landing'

// React
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Head from 'next/head'
// import CustomerPage from './components/CustomerPage'

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
      </Head>
      <Content />
    </MoralisProvider>
  )
}

function Content() {
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)

  const [alertUser, setAlertUser] = useState(false)

  console.log('rendering dashboard')

  useEffect(() => {
    // Check if Metamask is installed
    if (window.ethereum && window.ethereum.isMetaMask) {
      // Metamask is installed
      console.log('Metamask is installed')
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
  }, [enableWeb3, isWeb3Enabled, isAuthenticated])

  useEffect(() => {
    console.log('alertUser', alertUser)
  }, [alertUser])

  function openModal() {
    setIsOpen(true)
  }

  function openWalletModal() {
    setWalletModalIsOpen(true)
  }

  return (
    <div style={{ filter: modalIsOpen ? 'brightness(0.5) blur(5px)' : 'none' }}>
      <Landing />
      {/* <Routes>
        <Route
          path='/dashboard'
          element={
            isAuthenticated ? (
              <Dashboard
                openModal={openModal}
                openWalletModal={openWalletModal}
              />
            ) : (
              <Navigate to='/' state={{ from: location }} />
            )
          }
        ></Route>
        <Route path='customer/:id' element={<CustomerPage />} />
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Navigate to='/dashboard' state={{ from: location }} />
            ) : (
              <Landingv2 alertUser={alertUser} />
            )
          }
        ></Route>
      </Routes>
      <ProductModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <WalletModal
        walletModalIsOpen={walletModalIsOpen}
        setWalletModalIsOpen={setWalletModalIsOpen}
      /> */}
    </div>
  )
}

export default App
