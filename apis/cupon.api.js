import axios from 'axios'
import { BASE_URL } from './url'

export const verifyCupon = async data => {
  const { cuponCode, userId } = data
  try {
    const response = await axios.get(
      `${BASE_URL}/cupon/verify/${cuponCode}/${userId}`
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
