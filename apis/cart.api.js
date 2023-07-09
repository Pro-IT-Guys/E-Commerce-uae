import axios from 'axios'
import { CART_URL } from './url'

export const addToCart = async data => {
  const { token, userId, productId, quantity, size, color } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.post(
      `${CART_URL}`,
      { userId, product: [{ productId, quantity, size, color }] },
      config
    )
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getCartByUserId = async data => {
  const { token, userId } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.get(`${CART_URL}/user/${userId}`, config)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getCartByCartId = async data => {
  const { token, cartId } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.get(`${CART_URL}/${cartId}`, config)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const updateCart = async data => {
  const { token, userId, productId, quantity, cartId, size, color } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.patch(
      `${CART_URL}/${cartId}`,
      { userId, product: [{ productId, quantity, size, color }] },
      config
    )
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const bulkUpdateCart = async data => {
  const { token, cartId, product } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.patch(
      `${CART_URL}/bulk/${cartId}`,
      { product },
      config
    )
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteAProductFromCart = async data => {
  const { token, productId, cartId } = data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.delete(
      `${CART_URL}/remove/${cartId}/${productId}`,
      config
    )
    return res?.data
  } catch (error) {
    console.log(error)
  }
}
