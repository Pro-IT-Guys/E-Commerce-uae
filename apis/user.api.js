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

export const getALlUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
