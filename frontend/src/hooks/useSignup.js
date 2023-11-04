import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [err, setErr] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async(email, password) => {
    setIsLoading(true)
    setErr(null)

    const response = await fetch('api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({email, password})
    })
    const json = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setErr(json.error)
    }

    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false)
    }
  }

  return {
    signup,
    isLoading,
    err
  }
}