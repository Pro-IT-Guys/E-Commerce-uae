import React, { useContext, useEffect, useState } from 'react'
import { ContextData } from 'context/dataProviderContext'
import { useRouter } from 'next/router'
import CustomLoadingScreen from 'src/components/CustomLoadingScreen'
import { getStorage } from 'apis/loadStorage'

const useAuthAdmin = WrappedComponent => {
  return props => {
    const { currentlyLoggedIn, setUpdate } = useContext(ContextData)
    const { role } = currentlyLoggedIn || {}
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
      const userRole = getStorage('role')

      // if (isLoading) return <CustomLoadingScreen />

      if (userRole !== 'admin') {
        router.push('/404')
      }
    }, [])

    return (
      <>
        {isLoading ? <CustomLoadingScreen /> : <WrappedComponent {...props} />}
      </>
    )
  }
}

export default useAuthAdmin
