import axios from 'axios'
import { BASE_URL } from './url'

export const createCurrency = async convertRate => {
  try {
    const response = await axios.post(`${BASE_URL}/currency`, {
      convertRate,
    })
    if (!response?.data?.success) toast.error(response?.data?.message)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

export const getCurrency = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/currency`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
