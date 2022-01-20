import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { tokengetter } from '../API/tokengetter'

export const LoadingScreenAuthState = () => {
  const router = useRouter()
  const { user, setUserData } = useMoralis()

  const [states, setStates] = useState<boolean[]>([])

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    user === null ? false : true
  )
  

  const timeoutRef = useRef<any>(null)

  useEffect(() => {
    let newStates = [...states, isAuthenticated]
    setStates(newStates)
  }, [isAuthenticated])

  useEffect(() => {
    if (states.length >= 2) {
      if (states[states.length - 1] === true) {
        // console.log('AUTH IS TRUE: ', user)
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
    
   
    
    setIsAuthenticated(user === null ? false : true)
  }, [user])

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
