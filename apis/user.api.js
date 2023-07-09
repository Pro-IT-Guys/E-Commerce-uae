import axios from 'axios'
import { BASE_URL } from './url'

export const getAdmin = async () => {
  const admin = await axios.get(`${BASE_URL}/user/admin`)
  return admin?.data
}

export const getUserById = async userId => {
  const user = await axios.get(`${BASE_URL}/user/${userId}`)
  return user?.data
}
