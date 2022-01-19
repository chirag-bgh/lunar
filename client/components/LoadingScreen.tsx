import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useMoralis } from 'react-moralis'

export const LoadingScreenAuthState = () => {
  const router = useRouter()

  const [states, setStates] = useState<boolean[]>([])

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  console.log('IsAuthenticated: ',isAuthenticated)

  const timeoutRef = useRef<any>(null)

  useEffect(() => {
    let newStates = [...states, isAuthenticated]
    setStates(newStates)
  }, [isAuthenticated])

  useEffect(() => {
    if (states.length >= 2) {
      if (states[states.length - 1] === true) {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current)
        }
      } else {
        router.push('/')
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null
        if (states.length == 1 && states[0] === false) {
          router.push('/')
        }
      }, 1000)
    }
  }, [states])

  useEffect(() => {
    if(window.ethereum.isConnected()){
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

  }, [isAuthenticated])

  return (
    <div className='h-screen w-screen bg-background flex justify-center items-center text-4xl font-display text-white'>
      Loading...
    </div>
  )
}

export const LoadingScreen = () => {
  return (
    <div className='h-screen w-screen bg-background flex justify-center items-center text-4xl font-display text-white'>
      Loading...
    </div>
  )
}
