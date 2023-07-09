import axios from 'axios'
import { BASE_URL } from './url'

export const stripePayment = async data => {
  const { orderId, token, currency, amount } = data

  try {
    await axios.post('/payment/stripe', {
      orderId,
      token,
      currency,
      amount,
    })
  } catch (error) {
    console.log(error)
  }
}

export const paypalPaymentApi = async data => {
  const { orderId, email, currency } = data

  try {
    const response = await axios.post(`${BASE_URL}/payment/paypal`, {
      orderId,
      email,
      currency,
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const paypalPaymentVerifyWebhook = async data => {
  const { paymentId } = data
  try {
    const response = await axios.post(`${BASE_URL}/payment/paypal/webhook`, {
      resource: {
        id: paymentId,
      },
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
