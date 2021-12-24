import { useMoralis } from 'react-moralis'
// import { TransferButton, DisplayTransaction } from './components/transfer'

// Components
import Dashboard from './components/Dashboard/Dashboard'
// import Landing from './components/Landing'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ProductModal from './components/ProductModal'
import WalletModal from './components/WalletModal'
import Landingv2 from './components/Landingv2'

// React
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, memo, useEffect } from 'react'
import CustomerPage from './components/CustomerPage'

declare const window: any

function App() {
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis()

  let location = useLocation()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)

  const [alertUser, setAlertUser] = useState(false)

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

  function openModal() {
    setIsOpen(true)
  }

  function openWalletModal() {
    setWalletModalIsOpen(true)
  }

  return (
    <div style={modalIsOpen ? { filter: 'brightness(0.5) blur(5px)' } : null}>
      <Routes>
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
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>\{' '}
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
      />
    </div>
  )
}

export default memo(App)
