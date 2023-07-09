import axios from 'axios'
import { AUTH_URL } from './url'

export const loggedInUser = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const res = await axios.get(`${AUTH_URL}/me`, config)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}