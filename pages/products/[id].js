import styled from '@emotion/styled'
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Fab,
  Icon,
  Rating,
  Stack,
  Typography,
  alpha,
  Box,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Banner from 'src/components/Home/Banner/Banner'
import Page from 'src/components/Page'
import ProductDetailsCarousel from 'src/components/Products/ProductDetailsCarousel'
import MainLayout from 'src/layouts/main'
import { useRouter } from 'next/router'
import Label from 'src/components/Label'
import { useField } from 'formik'
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart'
import ChatPopup from 'src/components/chat/ChatPopup'
import { MIconButton } from 'src/components/@material-extend'
import MenuPopover from 'src/components/MenuPopover'
import {
  createChat,
  getChatOfSenderAndReceiver,
  getMessageOfChatId,
} from 'apis/chat.api'
import { adminId } from 'constant/constant'
import { ContextData } from 'context/dataProviderContext'
import { io } from 'socket.io-client'
import { getStorage } from 'apis/loadStorage'
import { addToCart, updateCart } from 'apis/cart.api'
import { convertCurrency } from 'helpers/currencyHandler'

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

  // Base states
  const /* The code `socket.on('getMessage', data => { ... })` is setting up a listener for the
  'getMessage' event on the socket object. When the 'getMessage' event is emitted from the
  server, the callback function will be executed. */
    [sendMessageBase, setSendMessageBase] = useState(false)

  const [openChat, setOpenChat] = useState(false)
  const anchorRef = useRef(null)
  const { currentlyLoggedIn, usersCart, fromCurrency, toCurrency } =
    useContext(ContextData)
  const [productSize, setProductSize] = useState('XL')
  const [productDetails, setProductDetails] = useState({})
  const [productQuantity, setProductQuantity] = useState(1)
  const router = useRouter()
  const params = router.query.id

  // Create chat with admin / get chat if already exist
  useEffect(() => {
    const retriveChat = async () => {
      if (currentlyLoggedIn?.role === 'admin') return
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
    retriveChat()
  }, [currentlyLoggedIn])

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
      socket.current = io('http://localhost:8080')
      socket.current.emit('join', currentlyLoggedIn._id)

      socket.current.on('activeUsers', users => {
        setOnlineUsers(users)
      })
    }
  }, [currentlyLoggedIn])

  // Create chat with admin / get chat if already exist
  const handleChatClick = async () => {
    if (currentlyLoggedIn?.role === 'admin') return

    setOpenChat(true)
  }

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/product/path/${params}`)
      .then(res => res.json())
      .then(data => setProductDetails(data?.data))
  }, [params])

  const { name, sellingPrice, quantity, rating, description, images } =
    productDetails || {}

  // Cart Logics===============>
  const handleAddToCart = async () => {
    const userId = currentlyLoggedIn?._id
    const token = getStorage('token')
    const productId = productDetails._id
    const data = {
      token,
      userId,
      productId,
      quantity: productQuantity,
    }

    if (usersCart) {
      const res = await updateCart({ ...data, cartId: usersCart?._id })
      if (res?.statusCode === 200) alert('Product added to cart')
    } else {
      const res = await addToCart(data)
      if (res?.statusCode === 200) alert('Product added to cart')
    }
    // window.location.reload()
  }

  return (
    <>
      <MainLayout>
        <div className="bg-[#f7f7ff9c] pb-20  pt-10">
          <Container maxWidth="lg">
            <Card className="mt-28  pb-10">
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
                <Grid item xs={12} md={6} lg={5} p={5}>
                  <Label
                    // variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                    color={quantity > 0 ? 'success' : 'error'}
                    sx={{ textTransform: 'uppercase' }}
                  >
                    {quantity > 0 ? 'In-Stock' : 'Stock-Out'}
                  </Label>

                  <h1 className="text-xl font-semibold mt-3">{name}</h1>

                  <Stack
                    spacing={0.5}
                    direction="row"
                    alignItems="center"
                    sx={{ mb: 2, mt: 1 }}
                  >
                    <Rating value={`${rating}.5`} precision={0.1} readOnly />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {rating} Ratings
                    </Typography>
                  </Stack>
                  <p className="text-sm">
                    Brand: {productDetails?.brand?.name}
                  </p>
                  <p className="text-xl font-semibold mt-3 text-secondary">
                    {convertCurrency(fromCurrency, toCurrency, sellingPrice)}
                  </p>
                  {/* <strike className="text-[#7a7a7a] text-xs">
                    ৳ {sellingPrice}
                  </strike> */}

                  <div className="mt-4">
                    <div className="flex items-center gap-5">
                      <p className="text-sm">Size</p>
                      <FormControl variant='standard'>
                        <Select
                          label="Size"
                          value={productSize}
                          onChange={e => setProductSize(e.target.value)}
                          sx={{
                            fontSize: '0.7rem',
                            padding: '0px',
                            border: 'none',
                            '&:hover': {
                              border: 'none',
                            },
                            ':focus': {
                              border: 'none',
                            },
                          }}
                          className="hover:border-none p-0 m-0 text-[10px]"
                        >
                          {productDetails?.size?.map(item => (
                            <MenuItem className="p-0" value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="mt-10 pb-20 gap-4 relative items-center flex">
                    <p className="text-sm">Quantity :</p>

                    <div className="flex  gap-2">
                      <div
                        className="cursor-pointer select-none rounded text-center flex items-center justify-center bg-[#ecebff] h-8 w-8"
                        onClick={() =>
                          setProductQuantity(
                            productQuantity > 1 ? productQuantity - 1 : 1
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
                              : quantity
                          )
                        }
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <Divider sx={{ borderStyle: 'dashed' }} />

                  <Stack
                    spacing={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ mt: 5 }}
                  >
                    <Button
                      fullWidth
                      // disabled={isMaxQuantity}
                      size="large"
                      type="button"
                      color="warning"
                      variant="contained"
                      startIcon={<Icon icon={roundAddShoppingCart} />}
                      onClick={handleAddToCart}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(
                          `/checkout/product/sku=${productDetails.sku}`
                        )
                      }
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Buy Now
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </div>
      </MainLayout>

      {currentlyLoggedIn?.role !== 'admin' && (
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
            socket={socket.current}
            chat={chat}
            openChat={openChat}
            setOpenChat={setOpenChat}
            anchorRef={anchorRef.current}
            message={message}
            setMessage={setMessage}
            setSendMessageBase={setSendMessageBase}
          />
        </>
      )}
    </>
  )
}