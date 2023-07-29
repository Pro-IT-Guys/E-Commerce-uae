import styled from '@emotion/styled'
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Fab,
  Rating,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
} from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Page from '../../src/components/Page'
import ProductDetailsCarousel from '../../src/components/Products/ProductDetailsCarousel'
import MainLayout from '../../src/layouts/main'
import { useRouter } from 'next/router'
import Label from '../../src/components/Label'
import ChatPopup from '../../src/components/chat/ChatPopup'
import {
  createChat,
  getChatOfSenderAndReceiver,
  getMessageOfChatId,
} from '../../apis/chat.api'
import { adminId } from '../../constant/constant'
import { ContextData } from '../../context/dataProviderContext'
import { io } from 'socket.io-client'
import { getStorage } from '../../apis/loadStorage'
import { addToCart, updateCart } from '../../apis/cart.api'
import { convertCurrency } from '../../helpers/currencyHandler'
import { toast } from 'react-hot-toast'
import ProductDetailsTab from '../../src/components/Products/ProductDetailsTab'
import RelatedProducts from '../../src/components/Products/RelatedProducts'
import { ButtonAnimate, DialogAnimate } from '../../src/components/animate'
import ClearIcon from '@mui/icons-material/Clear'
import { getProductByPath } from '../../apis/product.api'
import CustomLoadingScreen from '../../src/components/CustomLoadingScreen'
import { getCurrentOffer } from '../../apis/offer.api'

const ChatButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 999,
}))

export default function ProductDetails() {
  const socket = useRef()
  const [message, setMessage] = useState([])
  const [chat, setChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  const [openChat, setOpenChat] = useState(false)
  const anchorRef = useRef(null)
  const {
    currentlyLoggedIn,
    usersCart,
    setUsersCart,
    setCartSimplified,
    update,
    setCartUpdate,
    fromCurrency,
    toCurrency,
    rateAEDtoUSD,
  } = useContext(ContextData)
  const [productSize, setProductSize] = useState('XL')
  const [productDetails, setProductDetails] = useState({})
  const [offerDetails, setOfferDetails] = useState({})
  const [productQuantity, setProductQuantity] = useState(1)
  const [productColor, setProductColor] = useState('Black')
  const router = useRouter()
  const params = router.query.id
  const [loader, setLoader] = useState(false)
  const [retriveCartState, setRetriveCartState] = useState(false)
  const [productUrl, setProductUrl] = useState('')
  const [openSizeChartPopup, setOpenSizeChartPopup] = useState(false)

  const [isProductIsInOffer, setIsProductIsInOffer] = useState(undefined)

  useEffect(() => {
    setProductUrl(window.location.href)
  }, [params])

  // Create chat with admin / get chat if already exist
  useEffect(() => {
    const retriveChat = async () => {
      setLoader(true)
      if (currentlyLoggedIn?._id) {
        if (currentlyLoggedIn?.role === 'admin') {
          setLoader(false)
          return
        }

        let data

        data = await createChat({
          senderId: currentlyLoggedIn?._id,
          receiverId: adminId,
        })

        if (!data) {
          data = await getChatOfSenderAndReceiver({
            senderId: currentlyLoggedIn?._id,
            receiverId: adminId,
          })
        }
        setChat(data?.data)
      }
      setLoader(false)
    }
    retriveChat()
  }, [update, currentlyLoggedIn])

  // Get chat of sender and receiver
  useEffect(() => {
    const retriveMessage = async () => {
      if (chat?._id) {
        const messages = await getMessageOfChatId(chat?._id)
        setMessage(messages?.data)
      }
    }
    retriveMessage()
  }, [chat])

  // Initialize socket..Make useEffect if only the currentlyLoggedIn exist
  useEffect(() => {
    if (currentlyLoggedIn) {
      socket.current = io('https://server.aymifashion.com')
      socket.current.emit('join', currentlyLoggedIn._id)

      socket.current.on('activeUsers', users => {
        setOnlineUsers(users)
      })
    }
  }, [currentlyLoggedIn])

  useEffect(() => {
    socket.current?.on('getCartData', data => {
      if (data?.product?.length !== 0 && retriveCartState) {
        setUsersCart(data)
        setCartSimplified(data?.product)
      }
    })
  }, [retriveCartState])

  // Create chat with admin / get chat if already exist
  const handleChatClick = async () => {
    if (currentlyLoggedIn?.role === 'admin') return

    setOpenChat(true)
  }

  useEffect(() => {
    setLoader(false)
    const _retriveData = async () => {
      const [product, offer] = await Promise.all([
        getProductByPath(params),
        getCurrentOffer(),
      ])
      setProductDetails(product?.data)
      setOfferDetails(offer?.data)
      setLoader(false)
    }
    _retriveData()
  }, [params])

  useEffect(() => {
    const isProductIsInOffer = offerDetails?.product?.find(
      product => product === productDetails?._id,
    )
    setIsProductIsInOffer(isProductIsInOffer)
  }, [productDetails, offerDetails])

  const { name, sellingPrice, quantity, rating, metaDescription, frontImage } =
    productDetails || {}

  if (loader || !productUrl) return <CustomLoadingScreen />

  // Cart Logics===============>
  const handleAddToCart = async () => {
    const userId = currentlyLoggedIn?._id
    const token = getStorage('token')
    const productId = productDetails._id

    if (!productSize) return toast.error('Please select a size')
    if (!productColor) return toast.error('Please select a color')
    if (!userId) return toast.error('Please login first')

    const data = {
      token,
      userId,
      productId,
      quantity: productQuantity,
      size: productSize,
      color: productColor,
    }

    if (usersCart) {
      const res = await updateCart({ ...data, cartId: usersCart?._id })
      if (res?.statusCode === 200) {
        // Send the data in the socket to update the cart
        socket.current.emit('cartData', {
          data: res?.data,
        })
        setRetriveCartState(!retriveCartState)
        toast.success('Product added to cart')
        setCartUpdate(Math.random())
      }
    } else {
      const res = await addToCart(data)
      socket.current.emit('cartData', {
        data: res?.data,
      })
      setRetriveCartState(!retriveCartState)

      if (res?.statusCode === 200) alert('Product added to cart')
    }
  }

  return (
    <>
      <MainLayout>
        <Page
          title={`AYMi | ${name}`}
          metaDescription={metaDescription}
          metaImage={frontImage}
        >
          <div className="bg-[#f7f7ff9c] pb-10  pt-10">
            <Container maxWidth="lg">
              <Card className="mt-28 ">
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={7}
                    p={3}
                    className="overflow-hidden"
                  >
                    <ProductDetailsCarousel product={productDetails} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={5} p={3}>
                    <Label
                      color={quantity > 0 ? 'success' : 'error'}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {quantity > 0 ? 'In-Stock' : 'Stock-Out'}
                    </Label>

                    <h1 className="text-xl font-semibold mt-3">{name}</h1>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {productDetails?.metaDescription?.length > 50
                        ? productDetails?.metaDescription?.slice(0, 50)
                        : productDetails?.metaDescription}
                      {productDetails?.metaDescription?.length > 50 && '...'}
                    </Typography>

                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      sx={{ mb: 2, mt: 1 }}
                    >
                      <Rating value={`${rating}.5`} precision={0.1} readOnly />
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.primary' }}
                      >
                        {rating} Ratings
                      </Typography>
                    </Stack>
                    <p className="text-sm">Fabric: {productDetails?.fabric}</p>

                    <div className="flex items-center mt-3">
                      {isProductIsInOffer ? (
                        <div className="flex flex-col items-start">
                          <strike className="text-sm font-semibold  text-gray-600">
                            {convertCurrency(
                              fromCurrency,
                              toCurrency,
                              sellingPrice,
                              rateAEDtoUSD,
                            )}
                          </strike>
                          <p className="text-xl font-semibold  text-secondary">
                            {convertCurrency(
                              fromCurrency,
                              toCurrency,
                              Number(sellingPrice) -
                                Number(offerDetails?.discountPrice || 0),
                              rateAEDtoUSD,
                            )}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl font-semibold  text-secondary">
                          {convertCurrency(
                            fromCurrency,
                            toCurrency,
                            sellingPrice,
                            rateAEDtoUSD,
                          )}
                        </p>
                      )}

                      <ButtonAnimate mediumClick>
                        <small
                          onClick={() => setOpenSizeChartPopup(true)}
                          className="border-primary border px-2 py-1 rounded-md text-primary cursor-pointer ml-5"
                        >
                          Size Chart
                        </small>
                      </ButtonAnimate>
                    </div>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="size-label">Size</InputLabel>
                          <Select
                            size="small"
                            labelId="size-label"
                            id="demo-simple-select"
                            value={productSize || ''}
                            label="Size"
                            onChange={e => setProductSize(e.target.value)}
                          >
                            {productDetails?.size?.map(size => (
                              <MenuItem key={size} value={size}>
                                {size}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="size-label">Color</InputLabel>
                          <Select
                            size="small"
                            labelId="color-label"
                            id="demo-simple-select"
                            value={productColor || ''}
                            label="Color"
                            onChange={e => setProductColor(e.target.value)}
                          >
                            {productDetails?.color?.map(color => (
                              <MenuItem key={color} value={color}>
                                {color}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <div className="mt-10 md:pb-20 pb-10 gap-4 relative items-center flex">
                      <p className="text-sm">Quantity :</p>

                      <div className="flex  gap-2">
                        <div
                          className="cursor-pointer select-none rounded text-center flex items-center justify-center bg-[#ecebff] h-8 w-8"
                          onClick={() =>
                            setProductQuantity(
                              productQuantity > 1 ? productQuantity - 1 : 1,
                            )
                          }
                        >
                          -
                        </div>
                        <p className="w-8 h-8 flex items-center justify-center">
                          {productQuantity}
                        </p>
                        <div
                          className="cursor-pointer select-none rounded text-center flex items-center justify-center bg-[#ecebff] h-8 w-8"
                          onClick={() =>
                            setProductQuantity(
                              productQuantity < quantity
                                ? productQuantity + 1
                                : quantity,
                            )
                          }
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Stack spacing={2} direction={'row'} sx={{ m: 5 }}>
                      <Button
                        fullWidth
                        size="medium"
                        type="button"
                        color="warning"
                        variant="contained"
                        onClick={handleAddToCart}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() =>
                          router.push(
                            `/checkout/product/sku=${productDetails.sku}&quantity=${productQuantity}&size=${productSize}&color=${productColor}`,
                          )
                        }
                        fullWidth
                        size="medium"
                        type="submit"
                        variant="contained"
                        sx={{
                          marginTop: {
                            xs: 1,
                            sm: 0,
                          },
                          marginBottom: {
                            xs: 1,
                            sm: 0,
                          },
                        }}
                      >
                        Buy Now
                      </Button>
                      {currentlyLoggedIn?.role &&
                        currentlyLoggedIn?.role !== 'admin' && (
                          <Button
                            onClick={() => {
                              setOpenChat(!openChat)
                            }}
                            fullWidth
                            size="medium"
                            type="submit"
                            variant="contained"
                            color='info'
                          >
                            Message
                          </Button>
                        )}
                    </Stack>
                  </Grid>
                </Grid>
              </Card>

              <ProductDetailsTab product={productDetails} />
              {productDetails && Object.keys(productDetails).length > 0 && (
                <RelatedProducts product={productDetails} />
              )}
            </Container>
          </div>
        </Page>
      </MainLayout>
      {openSizeChartPopup && (
        <DialogAnimate
          maxWidth="md"
          open={openSizeChartPopup}
          onClose={setOpenSizeChartPopup}
        >
          <Card sx={{ width: '100%' }}>
            <ClearIcon
              onClick={() => setOpenSizeChartPopup(false)}
              color="#000"
              className="cross_icon margin_bottom_16px cursor-pointer"
            />
            <CardContent sx={{ mt: 2 }}>
              <img
                className="w-full h-full"
                src="/static/mock-images/sizeChart.png"
                alt=""
              />
            </CardContent>
          </Card>
        </DialogAnimate>
      )}

      {currentlyLoggedIn?.role && currentlyLoggedIn?.role !== 'admin' && (
        <>
          <ChatButton
            ref={anchorRef}
            onClick={handleChatClick}
            color="primary"
            aria-label="Chat with Us"
          >
            <ChatBubbleIcon />
          </ChatButton>

          <ChatPopup
            productUrl={productUrl}
            socket={socket.current}
            chat={chat}
            openChat={openChat}
            setOpenChat={setOpenChat}
            anchorRef={anchorRef.current}
            message={message}
            setMessage={setMessage}
          />
        </>
      )}
    </>
  )
}
