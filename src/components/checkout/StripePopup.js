import React, { useContext } from 'react'
import { ImCross } from 'react-icons/im'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ContextData } from 'context/dataProviderContext'
import StripeForm from './StripeForm'

const stripePromise = loadStripe(
  'pk_test_51L3PqJCnJiLLpGIeL4Uixr7K4bJ183L3tSUyFg2ENBX5ovRQKSQhaYTR8kG7WbcfvkvyuLa5RfB9eZlBJfohfpYd00PM7gqopw'
)

const StripePopup = ({ setOpenPopup }) => {
  const { currentlyLoggedIn, toCurrency } = useContext(ContextData)

  const handleStripePayment = async paymentMethodId => {
    console.log(paymentMethodId, 'paymentMethodId')
    const response = await fetch(
      'http://localhost:8000/api/v1/payment/stripe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: '649af82b3a3da1ac2861fa79',
          paymentMethodId,
          currency: toCurrency,
        }),
      }
    )

    if (response.ok) {
      console.log(response)
    } else {
      console.error('Payment failed')
    }
  }

  return (
    <div className="popup_wrapper">
      <div className="popup_content relative">
        <ImCross
          onClick={() => setOpenPopup(false)}
          className="absolute right-0 top-0 mr-4 mt-4 h-4 w-4 cursor-pointer"
        />
        <div>
          <div className="w-1/2 mt-[-50px] mx-auto">
            <Elements stripe={stripePromise}>
              <StripeForm handleSubmit={handleStripePayment} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripePopup
