import { useMoralis } from 'react-moralis'
import { AuthenticateButton, LogoutButton } from './components/Auth/AuthManager'
import { TransferButton, DisplayTransaction } from './components/transfer'

// Components
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing'
import Login from './components/Auth/Login'

// React
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis()
  // Moralis
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Landing />
  }

  if (!isWeb3Enabled) {
    enableWeb3()
  }

  // {/* @ts-ignore */}
  // <h1>Welcome {user.get("ethAddress")}</h1>
  //<LogoutButton />
  //<TransferButton amount={10} address="0x479327C7658AeBFa9F777B1B79D9353C7387e266" />
  //<DisplayTransaction />

  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Landing />}></Route>
      </Routes>
    </div>
  )
}

export default App
