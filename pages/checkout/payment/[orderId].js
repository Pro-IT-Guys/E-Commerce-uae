import styled from '@emotion/styled'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Icon,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ContextData } from 'context/dataProviderContext'
import React, { useContext, useEffect, useState } from 'react'
import MainLayout from 'src/layouts/main'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeForm from 'src/components/checkout/StripeForm'
import { paypalPaymentApi, paypalPaymentVerifyWebhook } from 'apis/payment.api'
import { getOrderById, updateOrder } from 'apis/order.api'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { ButtonAnimate } from 'src/components/animate'
import Loader from 'src/components/Loader/Loader'
import ShippingAddressPopup from 'src/components/checkout/ShippingAddressPopup'
import { getAllCountriesWithFees } from 'apis/fee.api'
import Page from 'src/components/Page'

const stripePromise = loadStripe(
  'pk_test_51L3PqJCnJiLLpGIeL4Uixr7K4bJ183L3tSUyFg2ENBX5ovRQKSQhaYTR8kG7WbcfvkvyuLa5RfB9eZlBJfohfpYd00PM7gqopw'
)

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(20),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(8),
  },
}))

const CheckoutPayment = () => {
  const { currentlyLoggedIn, toCurrency } = useContext(ContextData)
  const router = useRouter()
  const orderId = router.query.orderId
  const [existingOrder, setExistingOrder] = useState(null)
  const [email, setEmail] = useState('')
  const [paypalPayment, setPaypalPayment] = useState(false)
  const [paypalLink, setPaypalLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [addressPopup, setAddressPopup] = useState(false)

  const [country, setCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [shippingAddress, setShippingAddress] = useState({
    zipCode: '',
    phoneNumber: '',
    address_line: '',
  })

  const handleAdditionalInfo = e => {
    const { name, value } = e.target
    setShippingAddress(prev => ({ ...prev, [name]: value }))
  }

  const handleCountryChange = e => {
    const countryId = e.target.value
    setSelectedCountry(countryId)
  }

  const handleStateChange = e => {
    if (!selectedCountry) return

    const stateId = e.target.value
    setSelectedState(stateId)
  }

  useEffect(() => {
    setLoading(true)
    const _retriveCountry = async () => {
      // Retrive all countries with states and cities
      const result = await getAllCountriesWithFees()
      setCountry(result?.data)
      setLoading(false)
    }
    _retriveCountry()
  }, [])

  useEffect(() => {
    setPageLoading(true)
    const _retriveOrder = async () => {
      const id = await router.query.orderId
      const order = await getOrderById({ orderId: id })
      setExistingOrder(order?.data)
      setPageLoading(false)
    }
    _retriveOrder()
  }, [orderId])

  const handleStripePayment = async paymentMethodId => {
    setLoading(true)
    const response = await fetch(
      'http://localhost:8000/api/v1/payment/stripe',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          paymentMethodId,
          currency: toCurrency,
        }),
      }
    )

    if (response.ok) {
      toast.success('Payment successful')
      setLoading(false)
    } else {
      toast.error('Payment failed')
    }
  }

  const handlePaypalPayment = async () => {
    setLoading(true)
    const response = await paypalPaymentApi({
      orderId,
      email: email,
      currency: 'USD',
    })

    if (response?.statusCode === 200) {
      setPaypalLink(response?.data?.redirectUrl)
      window.open(response?.data?.redirectUrl, '_blank')
    }
    setLoading(false)
  }

  const handlePaypalPaymentVerify = async () => {
    setLoading(true)
    const order = await getOrderById({ orderId })
    if (!order) return toast.error('Order not found')
    const response = await paypalPaymentVerifyWebhook({
      paymentId: order.data.paymentId,
    })

    if (response?.statusCode === 200) {
      toast.success('Payment successful')
    } else {
      toast.error('Payment failed')
    }
    setLoading(false)
  }

  const handleConfirmAddress = async () => {
    setLoading(true)
    const data = {
      shippingAddress: {
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        zipCode: shippingAddress.zipCode,
        address_line: shippingAddress.address_line,
      },
    }
    if (orderId) {
      // update the shipping address of the order
      const response = await updateOrder(orderId, data)
      if (response?.statusCode === 200) {
        toast.success('Shipping address updated')
        setAddressPopup(false)
        window.location.reload()
      } else {
        toast.error('Failed to update shipping address')
      }
      setLoading(false)
    }
  }

  if (pageLoading) {
    return <Loader />
  }

  return (
    <>
      <Page title="AYMi | Billing">
        <MainLayout>
          <RootStyle>
            <Container>
              <h1 className="font-bold text-2xl">Checkout</h1>
              <div className="flex gap-2 text-sm mt-3 text-[#636262]">
                <p>Home - </p>
                <p>Checkout - </p>
                <p>Billing</p>
              </div>

              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ mb: 3 }}>
                    <CardHeader title="Billing Address" />
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        Billing address:
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.secondary', ml: 1 }}
                        >
                          {existingOrder?.shippingAddress?.address_line}
                        </Typography>
                      </Typography>

                      <Typography variant="body2" gutterBottom>
                        {`${existingOrder?.shippingAddress?.zipCode}, ${existingOrder?.shippingAddress?.city}, ${existingOrder?.shippingAddress?.state}, ${existingOrder?.shippingAddress?.country}`}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Phone: {existingOrder?.phoneNumber}
                      </Typography>

                      <Box
                        sx={{
                          mt: 3,
                          display: 'flex',
                          position: { sm: 'absolute' },
                          right: { sm: 24 },
                          bottom: { sm: 24 },
                        }}
                      >
                        <Box sx={{ mx: 0.5 }} />
                        <ButtonAnimate mediumClick={true}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setAddressPopup(true)}
                          >
                            Update Address
                          </Button>
                        </ButtonAnimate>
                      </Box>
                    </CardContent>
                  </Card>

                  <Button color="inherit">Continue Shopping</Button>
                </Grid>

                {!paypalPayment && (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3 }}>
                      <CardHeader title="Pay with card" />
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack>
                            <Elements stripe={stripePromise}>
                              <StripeForm handleSubmit={handleStripePayment} />
                            </Elements>

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontSize: 16, fontWeight: 'bold' }}
                              >
                                Or pay with
                              </Typography>
                              <img
                                onClick={() => setPaypalPayment(true)}
                                className="w-[100px] cursor-pointer"
                                src="https://i.ibb.co/WgWs4FC/paypal.png"
                                alt=""
                              />
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {paypalPayment && (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3 }}>
                      <CardHeader title="Pay with PayPal" />
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack>
                            <TextField
                              onChange={e => setEmail(e.target.value)}
                              fullWidth
                              value={email}
                              label="Your PayPal Email"
                            />
                            {paypalLink ? (
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, width: '170px' }}
                                onClick={handlePaypalPaymentVerify}
                                disabled={loading}
                              >
                                {loading ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  'Complete Payment'
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, width: '90px' }}
                                onClick={handlePaypalPayment}
                                disabled={!email || loading}
                              >
                                {loading ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  'Confirm'
                                )}
                              </Button>
                            )}

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 2,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontSize: 16, fontWeight: 'bold' }}
                              >
                                Or pay with
                              </Typography>
                              <img
                                onClick={() => setPaypalPayment(false)}
                                className="w-[50px] cursor-pointer ml-2"
                                src="https://i.ibb.co/mHLhz9h/stripe-logo-2.png"
                                alt=""
                              />
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Container>
          </RootStyle>
        </MainLayout>
      </Page>
      {addressPopup && (
        <ShippingAddressPopup
          handleCountryChange={handleCountryChange}
          selectedCountry={selectedCountry}
          country={country}
          setState={setState}
          handleStateChange={handleStateChange}
          selectedState={selectedState}
          state={state}
          setCity={setCity}
          selectedCity={selectedCity}
          city={city}
          setSelectedCity={setSelectedCity}
          handleAdditionalInfo={handleAdditionalInfo}
          handleConfirmAddress={handleConfirmAddress}
          setOpenPopup={setAddressPopup}
          loading={loading}
        />
      )}
    </>
  )
}

export default CheckoutPayment
