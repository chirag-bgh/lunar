import { useMoralis } from 'react-moralis'
// import { TransferButton, DisplayTransaction } from './components/transfer'

// Components
import Dashboard from './components/Dashboard/Dashboard'
// import Landing from './components/Landing'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ProductModal from './components/ProductModal'
import Landingv2 from './components/Landingv2'

// React
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated } = useMoralis()

  let location = useLocation()

  const [modalIsOpen, setIsOpen] = useState(false)

  console.log('Web3: ' + isWeb3Enabled)
  if (!isWeb3Enabled) {
    enableWeb3()
  }
  // // Moralis
  console.log('Is Authenticated: ' + isAuthenticated)
  if (!isAuthenticated) {
    return <Landingv2 />
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <div style={modalIsOpen ? { filter: 'brightness(0.5) blur(5px)' } : null}>
      <Routes>
        <Route
          path='/dashboard'
          element={<Dashboard openModal={openModal} />}
        ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
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
    </div>
  )
}

export default App
