import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BASE_URL } from './url'

export const getCurrentOffer = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Offer`)
    if (response?.status === 'false') {
      return toast.error(response?.message)
    }
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
