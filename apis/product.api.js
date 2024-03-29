import axios from 'axios'
import { BASE_URL } from './url'
import { toast } from 'react-hot-toast'

export const createProduct = async data => {
  try {
    const res = await axios.post(`${BASE_URL}/product`, data)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/product`)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const getProductBySku = async sku => {
  try {
    const res = await axios.get(`${BASE_URL}/product/sku/${sku}`)

    return res?.data
  } catch (error) {
    console.log(error)
  }
}
export const getProductByPath = async path => {
  try {
    const res = await axios.get(`${BASE_URL}/product/path/${path}`)
    if (res?.status === 'false') {
      toast.error(res?.data?.message)
    }
    return res?.data
  } catch (error) {
    console.log(error)
  }
}

export const multiFilterProduct = async data => {
  const { searchTerm, category, maxPrice, minPrice, type, style, fabric, limit } = data

  const queryParams = {
    searchTerm,
    maxPrice,
    minPrice,
    category: Array.isArray(category) ? category.join(',') : category,
    type: Array.isArray(type) ? type.join(',') : type,
    style: Array.isArray(style) ? style.join(',') : style,
    fabric: Array.isArray(fabric) ? fabric.join(',') : fabric,
    limit,
  }

  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  )

  try {
    const queryString = new URLSearchParams(filteredParams).toString()
    const url = `${BASE_URL}/product/?${queryString}`
    const res = await axios.get(url)

    return res?.data
  } catch (error) {
    console.log(error)
  }
}
