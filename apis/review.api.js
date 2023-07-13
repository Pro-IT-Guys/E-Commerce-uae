import axios from 'axios'
import { BASE_URL } from './url'
import { toast } from 'react-hot-toast'

export const leaveReview = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/review`, data)
    return response?.data
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}

export const getReviews = async productId => {
  try {
    const response = await axios.get(`${BASE_URL}/review/${productId}`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
