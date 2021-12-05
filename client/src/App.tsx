// Moralis
import { useMoralis } from 'react-moralis'

// Components
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'

// React
import { Routes, Route } from 'react-router-dom'

function App() {
  const { isAuthenticated } = useMoralis()

  if (!isAuthenticated) {
    return <Landing />
  }
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/' element={<Landing />}></Route>
    </Routes>
  )
}

export default App
