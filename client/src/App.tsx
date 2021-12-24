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
import { useState } from 'react'
import CustomerPage from './components/CustomerPage'

declare const window: any

function App() {
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis()

  let location = useLocation()

  const [modalIsOpen, setIsOpen] = useState(false)
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false)

  if (!isWeb3Enabled) {
    // Check if Metamask is installed
    if (window.ethereum && window.ethereum.isMetaMask) {
      enableWeb3()
      console.log('Enabling web3\nAuthenticated is now: ', isAuthenticated)
      if (!isAuthenticated) {
        return <Landingv2 />
      }
    } else {
      console.log('Please install MetaMask!')
      return (
        // TODO: Update design for this
        <div className='flex w-screen h-screen bg-black justify-center items-center text-4xl'>
          <h1>Please install MetaMask!</h1>
        </div>
      )
    }
  } else {
    //Redirect to landing page if not authenticated
    if (!isAuthenticated) {
      return <Landingv2 />
    }
  }

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
            <Dashboard
              openModal={openModal}
              openWalletModal={openWalletModal}
            />
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
              <Landingv2 />
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

export default App
