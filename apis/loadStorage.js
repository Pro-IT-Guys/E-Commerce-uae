export const getStorage = key => {
  if (typeof window !== 'undefined') {
    const storedData = window.localStorage.getItem(key)
    if (storedData) {
      return storedData
    }
  }
  return null
}

export const getCart = () => {
  if (typeof window !== 'undefined') {
    const storedCart = window.localStorage.getItem('cart')
    if (storedCart) {
      return JSON.parse(storedCart)
    }
  }
  return null
}

export const setStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    if (key && value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      console.log('key and value are required')
    }
  }
}

export const removeStorage = key => {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.removeItem(key)
    } else {
      console.log('key is required')
    }
  }
}
