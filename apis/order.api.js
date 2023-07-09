import axios from 'axios'
import { BASE_URL } from './url'

export const getOrderById = async data => {
  const { orderId } = data
  try {
    const response = await axios.get(`${BASE_URL}/order/${orderId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const placeOrder = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/order`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateOrder = async (orderId, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/order/${orderId}`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
