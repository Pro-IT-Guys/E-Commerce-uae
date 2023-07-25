import io from 'socket.io-client'
import { loggedInUser } from 'apis/auth.api'
import { getCartByUserId } from 'apis/cart.api'
import { getStorage, removeStorage, setStorage } from 'apis/loadStorage'
import { getCurrentLocation } from 'apis/location'
import React, { createContext, useEffect, useRef, useState } from 'react'
import generateUniqueId from 'helpers/generateUniqueId'

export const ContextData = createContext()

export const ContextProvider = ({ children }) => {
  const socket = useRef()
  const [currentlyLoggedIn, setcurrentlyLoggedIn] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [token, setToken] = useState(null)
  const [location, setLocation] = useState(null)
  const [fromCurrency, setFromCurrency] = useState(null)
  const [toCurrency, setToCurrency] = useState(null)
  const [usersCart, setUsersCart] = useState(null)
  const [cartSimplified, setCartSimplified] = useState(null)
  const [update, setUpdate] = useState('')
  // Search Term amd Filter
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState([])
  const [type, setType] = useState([])
  const [style, setStyle] = useState([])
  const [fabric, setFabric] = useState([])
  const [value, setValue] = useState([0, 1000])
  const [cartUpdate, setCartUpdate] = useState('')

  // Initialize socket..Make useEffect if only the currentlyLoggedIn exist
  useEffect(() => {
    socket.current = io('http://localhost:8000/')
    socket.current.emit('join', generateUniqueId(10))

    socket.current.on('activeUsers', users => {
      setOnlineUsers(users)
    })
  }, [])

  useEffect(() => {
    const retriveUser = async () => {
      const location = await getCurrentLocation()
      setLocation(location?.data)
      if (location?.data?.country === 'United Arab Emirates') {
        setFromCurrency('AED')
        setToCurrency('AED')
      } else {
        setFromCurrency('AED')
        setToCurrency('USD')
      }

      const token = await getStorage('token')
      setToken(token)

      if (token) {
        const user = await loggedInUser(token)
        // !user clear local storage
        // if (!user) removeStorage('role')
        setcurrentlyLoggedIn(user?.data)
        // Get the users cart
        const cart = await getCartByUserId({ token, userId: user?.data?._id })
        if (cart?.statusCode === 200) {
          setUsersCart(cart?.data)
          setCartSimplified(cart?.data?.product)
        }
      } else {
        setcurrentlyLoggedIn(null)
        setCartSimplified(null)
      }
    }
    retriveUser()
  }, [update, cartUpdate])

  // console.log('cartSimplified', cartSimplified)

  const handleClearFilter = () => {
    setCategory([])
    setType([])
    setStyle([])
    setFabric([])
    setValue([0, 1000])
  }

  const contextValues = {
    token,
    currentlyLoggedIn,
    setToken,
    usersCart,
    cartSimplified,
    setCartSimplified,
    location,
    fromCurrency,
    toCurrency,
    setToCurrency,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    type,
    setType,
    style,
    setStyle,
    fabric,
    setFabric,
    value,
    setValue,
    setType,
    setStyle,
    setFabric,
    handleClearFilter,
    setUsersCart,
    setUpdate,
    update,
    cartUpdate,
    setCartUpdate,
    onlineUsers,
  }

  return (
    <ContextData.Provider value={contextValues}>
      {children}
    </ContextData.Provider>
  )
}
