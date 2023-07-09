import axios from 'axios'
import { BASE_URL } from './url'

export const createChat = async data => {
  try {
    const res = await axios.post(`${BASE_URL}/chat`, data)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getChats = async data => {
  try {
    const res = await axios.get(`${BASE_URL}/chat`, data)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getMessageOfChatId = async chatId => {
  try {
    const res = await axios.get(`${BASE_URL}/message/${chatId}`)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getChatOfSenderAndReceiver = async data => {
  try {
    const { senderId, receiverId } = data
    const res = await axios.get(`${BASE_URL}/chat/${senderId}/${receiverId}`)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const sendMessage = async data => {
  try {
    const res = await axios.post(`${BASE_URL}/message`, data)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}
