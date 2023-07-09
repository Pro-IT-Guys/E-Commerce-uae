import axios from 'axios'
const { BASE_URL } = require('./url')

export const getAllCountriesWithFees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/fee/all`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

export const getFeeOfLocation = async data => {
  const { countryId, stateCode, city_name } = data
  try {
    const response = await axios.post(`${BASE_URL}/fee/get_fee`, {
      countryId,
      stateCode,
      city_name,
    })
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
