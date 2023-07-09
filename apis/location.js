import axios from 'axios'
import { BASE_URL } from './url'
export const getCurrentLocation = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/location`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
