import axios from 'axios'
import { BASE_URL } from './url'
import { toast } from 'react-hot-toast'

export const createCupon = async data => {
  const { discount, expireDate } = data
  try {
    const response = await axios.post(`${BASE_URL}/cupon`, {
      discount,
      expireDate,
    })
    if (!response?.data?.success) toast.error(response?.data?.message)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

export const verifyCupon = async data => {
  const { cuponCode, userId } = data
  try {
    const response = await axios.get(
      `${BASE_URL}/cupon/verify/${cuponCode}/${userId}`,
    )
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllCupon = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cupon`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
