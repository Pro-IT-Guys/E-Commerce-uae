import styled from '@emotion/styled'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Icon,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import {
  deleteAProductFromCart,
  getCartByCartId,
  getCartByUserId,
} from 'apis/cart.api'
import { verifyCupon } from 'apis/cupon.api'
import { getAllCountriesWithFees, getFeeOfLocation } from 'apis/fee.api'
import { placeOrder } from 'apis/order.api'
import { getProductBySku } from 'apis/product.api'
import { ContextData } from 'context/dataProviderContext'
import { convertCurrencyForCalculation } from 'helpers/currencyHandler'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Loader from 'src/components/Loader/Loader'
import Page from 'src/components/Page'
import Scrollbar from 'src/components/Scrollbar'
import ProductList from 'src/components/checkout/CheckoutProductList'
import ShippingAddressPopup from 'src/components/checkout/ShippingAddressPopup'
import MainLayout from 'src/layouts/main'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(20),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(8),
  },
}))

export default function Checkout() {
  const { token, toCurrency, currentlyLoggedIn, fromCurrency } =
    useContext(ContextData)
  const [addressPopup, setAddressPopup] = useState(false)
  const router = useRouter()
  const query = router.query.productQuery
  const [product, setProduct] = useState([])
  const [loader, setLoader] = useState(false)
  const [muiLoader, setMuiLoader] = useState(false)
  const [orderItem, setOrderItem] = useState([])

  const [totalPrice, setTotalPrice] = useState(0)
  const [feeOfLocation, setFeeOfLocation] = useState(0)
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0)

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

  const [cupon, setCupon] = useState('')
  const [discountByCupon, setDiscountByCupon] = useState(0)

  const handleAdditionalInfo = e => {
    const { name, value } = e.target
    setShippingAddress(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setLoader(true)
    const _retriveCountry = async () => {
      // Retrive all countries with states and cities
      const result = await getAllCountriesWithFees()
      setCountry(result?.data)
      setLoader(false)
    }
    _retriveCountry()
  }, [])

  useEffect(() => {
    const _retriveProduct = async () => {
      setLoader(true)
      // Retrive product based on query
      if (query?.split('&')[0].split('=')[0] === 'sku') {
        const sku = query?.split('&')[0].split('=')[1]
        const res = await getProductBySku(sku)

        let singleOrderItem = {}
        let singleProduct = {}
        let productId = res?.data
        let singleProductId = res?.data?._id

        singleProduct.quantity = query?.split('&')[1].split('=')[1]
        singleProduct.size = query?.split('&')[2].split('=')[1]
        singleProduct.color = query?.split('&')[3].split('=')[1]

        singleOrderItem.quantity = query?.split('&')[1].split('=')[1]
        singleOrderItem.size = query?.split('&')[2].split('=')[1]
        singleOrderItem.color = query?.split('&')[3].split('=')[1]

        singleProduct.productId = productId
        singleOrderItem.product = singleProductId

        setProduct([singleProduct])
        setOrderItem([singleOrderItem])
        setLoader(false)
      } else if (query?.split('&')[0].split('=')[0] === 'cart' && token) {
        const cartId = query?.split('=')[1]
        const res = await getCartByCartId({ token, cartId })

        let orderItems = []
        res?.data?.product?.forEach(item => {
          let singleOrderItem = {}
          let singleProductId = item?.productId?._id

          singleOrderItem.quantity = item?.quantity
          singleOrderItem.size = item?.size
          singleOrderItem.color = item?.color

          singleOrderItem.product = singleProductId

          orderItems.push(singleOrderItem)
        })

        setOrderItem(orderItems)
        setProduct(res?.data?.product)
        setLoader(false)
      }
    }
    _retriveProduct()
  }, [query, token])

  useEffect(() => {
    if (product && product.length > 0) {
      let totalPrice = 0
      let calculatedDeliveryFee = 0
      product.forEach(item => {
        totalPrice +=
          Number(item.quantity) * Number(item.productId.sellingPrice)
        calculatedDeliveryFee += Number(item.quantity) * Number(feeOfLocation)
      })
      setTotalPrice(totalPrice)
      setTotalDeliveryFee(calculatedDeliveryFee)
    }
  }, [product, feeOfLocation])

  const handleCountryChange = e => {
    const countryId = e.target.value
    setSelectedCountry(countryId)
  }

  const handleStateChange = e => {
    if (!selectedCountry) return

    const stateId = e.target.value
    setSelectedState(stateId)
  }

  const handleProductRemove = async id => {
    if (id) {
      const newProductList = product.filter(item => {
        return item._id !== id
      })
      setProduct(newProductList)
      if (newProductList.length === 0) {
        setTotalPrice(0)
        setTotalDeliveryFee(0)
      }

      product.forEach(async item => {
        if (item._id === id) {
          const res = await deleteAProductFromCart({
            token,
            cartId: query?.split('=')[1],
            productId: item.productId._id,
          })
          if (res?.statusCode === 200) {
            toast.success('Product removed successfully.')
          } else {
            toast.error('Something went wrong.')
          }
        }
      })
    }
  }

  const handleConfirmAddress = async () => {
    const shippingFee = await getFeeOfLocation({
      countryId: selectedCountry,
      stateCode: selectedState,
      city_name: selectedCity,
    })
    setFeeOfLocation(shippingFee?.data?.delivery_fee)

    let calculatedDeliveryFee = 0
    product.forEach(item => {
      calculatedDeliveryFee +=
        Number(item.quantity) * Number(shippingFee?.data?.delivery_fee)
    })

    const orderData = {
      userId: currentlyLoggedIn?._id,
      orderItems: orderItem,
      phoneNumber: shippingAddress.phoneNumber,
      email: currentlyLoggedIn?.email,
      shippingAddress: {
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        zipCode: shippingAddress.zipCode,
        address_line: shippingAddress.address_line,
      },
      currency: toCurrency,
      subTotal: convertCurrencyForCalculation(
        fromCurrency,
        toCurrency,
        totalPrice
      ),
      deliveryFee: convertCurrencyForCalculation(
        fromCurrency,
        toCurrency,
        calculatedDeliveryFee
      ),
    }

    if (!currentlyLoggedIn) return toast.error('Please login to continue.')
    if (!selectedCountry) return toast.error('Please select a country.')
    if (!selectedState) return toast.error('Please select a state.')
    if (city?.length > 0 && !selectedCity)
      return toast.error('Please select a city.')
    if (!shippingAddress.zipCode) return toast.error('Please enter zip code.')
    if (!shippingAddress.phoneNumber)
      return toast.error('Please enter phone number.')
    if (!shippingAddress.address_line)
      return toast.error('Please enter address.')

    const res = await placeOrder(orderData)
    if (res?.statusCode === 200) {
      toast.success('Order placed successfully.')
      setAddressPopup(false)
      router.push(`/checkout/payment/${res?.data?._id}`)
    }
  }

  const handleApplyCupon = async () => {
    if (!cupon) return toast.error('Please enter a cupon code.')
    if (!currentlyLoggedIn) return toast.error('Please login to continue.')

    const data = {
      cuponCode: cupon,
      userId: currentlyLoggedIn?._id,
    }
    const res = await verifyCupon(data)
    if (res?.statusCode === 200) {
      setCupon('')

      // Calculate discount
      const parcentage = res?.data?.discount
      const discount = (Number(totalPrice) * Number(parcentage)) / 100
      console.log(discount)
      setDiscountByCupon(discount)
      setTotalPrice(Number(totalPrice) - Number(discount))
      toast.success(`You got ${parcentage}% discount.`)
    } else {
      toast.error('Invalid cupon code.')
    }
  }

  if (loader) return <Loader />

  return (
    <>
      <Page title="AYMi | Checkout">
        <MainLayout>
          <RootStyle>
            <Container>
              <h1 className="font-bold text-2xl">Checkout</h1>
              <div className="flex gap-2 text-sm mt-3 text-[#636262]">
                <p>Home - </p>
                <p>Cart - </p>
                <p>Checkout</p>
              </div>

              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={8}>
                  <Card className="p-2">
                    <h1 className="p-5 text-xl font-bold">
                      Cart{' '}
                      <span className="text-[#4e4e4e] font-medium text-sm">
                        {product?.length} items
                      </span>
                    </h1>

                    <Scrollbar>
                      <TableContainer sx={{ minWidth: 720 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Product</TableCell>
                              <TableCell align="left">Price</TableCell>
                              <TableCell align="left">Quantity</TableCell>
                              <TableCell align="right">Total Price</TableCell>
                              <TableCell align="right" />
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {product?.map((item, index) => {
                              return (
                                <ProductList
                                  setProduct={setProduct}
                                  handleProductRemove={handleProductRemove}
                                  product={product}
                                  key={index}
                                  item={item}
                                />
                              )
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Scrollbar>
                  </Card>

                  <Button color="inherit">Continue Shopping</Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  sx={{
                    marginLeft: {
                      xs: '0px',
                      sm: 'auto',
                      md: 'auto',
                    },
                    marginRight: {
                      xs: '0px',
                      sm: 'auto',
                      md: 'auto',
                    },
                  }}
                >
                  <Card sx={{ mb: 3 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        onChange={e => setCupon(e.target.value)}
                        sx={{ width: '70%' }}
                        label="Enter Coupon Code"
                        value={cupon}
                      />
                      <Button
                        onClick={handleApplyCupon}
                        sx={{ ml: 1, width: '30%', height: '54px' }}
                        variant="contained"
                      >
                        Apply
                      </Button>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 3 }}>
                    <CardHeader title="Order Summary" />
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                          >
                            Sub Total
                          </Typography>
                          <Typography variant="subtitle2">
                            {toCurrency === 'USD' && '$ '}
                            {convertCurrencyForCalculation(
                              fromCurrency,
                              toCurrency,
                              totalPrice
                            )}
                            {toCurrency === 'AED' && 'AED'}
                          </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                          >
                            Discount
                          </Typography>
                          <Typography variant="subtitle2">0</Typography>
                        </Stack>

                        {discountByCupon > 0 && (
                          <Stack direction="row" justifyContent="space-between">
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary' }}
                            >
                              Cupon Discount
                            </Typography>
                            <Typography variant="subtitle2">
                              {toCurrency === 'USD' && '$ '}
                              {convertCurrencyForCalculation(
                                fromCurrency,
                                toCurrency,
                                discountByCupon
                              )}
                              {toCurrency === 'AED' && 'AED'}
                            </Typography>
                          </Stack>
                        )}

                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                          >
                            Shipping
                          </Typography>
                          <Typography variant="subtitle2">
                            {toCurrency === 'USD' && '$ '}
                            {convertCurrencyForCalculation(
                              fromCurrency,
                              toCurrency,
                              totalDeliveryFee
                            )}
                            {toCurrency === 'AED' && 'AED'}
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="subtitle1">Total</Typography>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: 'error.main' }}
                            >
                              {toCurrency === 'USD' && '$ '}
                              {convertCurrencyForCalculation(
                                fromCurrency,
                                toCurrency,
                                Number(totalPrice) + Number(totalDeliveryFee)
                              )}
                              {toCurrency === 'AED' && 'AED'}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ fontStyle: 'italic' }}
                            >
                              (VAT included if applicable)
                            </Typography>
                          </Box>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Button
                    onClick={() => setAddressPopup(true)}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Check Out
                  </Button>
                </Grid>
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
        />
      )}
    </>
  )
}
