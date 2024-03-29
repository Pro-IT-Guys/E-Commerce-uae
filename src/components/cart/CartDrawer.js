import { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import { Badge, Box, Drawer, Typography } from '@mui/material'
import Scrollbar from '../Scrollbar'
import { CustomIcons } from '../../../public/static/mui-icons'
import { ContextData } from '../../../context/dataProviderContext'
import {
  bulkUpdateCart,
  deleteAProductFromCart,
  updateCartProductQuantity,
} from '../../../apis/cart.api'
import { useRouter } from 'next/router'
import { convertCurrency } from '../../../helpers/currencyHandler'
import CloseIcon from '@mui/icons-material/Close'

export default function CartDrawer() {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const {
    usersCart,
    cartSimplified,
    setCartSimplified,
    token,
    fromCurrency,
    toCurrency,
    rateAEDtoUSD,
  } = useContext(ContextData)

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleIncreaseQuantity = async productId => {
    const updatedCart = [...cartSimplified]
    const productIndex = updatedCart.findIndex(
      item => item.productId._id === productId,
    )

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += 1
      setCartSimplified(updatedCart)
      await updateCartProductQuantity({
        token,
        cartId: usersCart?._id,
        productId,
        quantity: updatedCart[productIndex].quantity,
      })
    }
  }

  const handleDecreaseQuantity = async productId => {
    const updatedCart = [...cartSimplified]
    const productIndex = updatedCart.findIndex(
      item => item.productId._id === productId,
    )

    if (productIndex !== -1) {
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1
        setCartSimplified(updatedCart)

        await updateCartProductQuantity({
          token,
          cartId: usersCart?._id,
          productId,
          quantity: updatedCart[productIndex].quantity,
        })
      } else {
        updatedCart.splice(productIndex, 1)
        setCartSimplified(updatedCart)
        await deleteAProductFromCart({
          token,
          cartId: usersCart?._id,
          productId,
        })
      }
    }
  }

  const handleCheckout = async () => {
    const dataToUpdate = {
      token,
      cartId: usersCart?._id,
      product: cartSimplified,
    }
    await bulkUpdateCart(dataToUpdate)
    router.push(`/checkout/product/cart=${usersCart?._id}`)
  }

  return (
    <>
      <div
        onClick={handleDrawerOpen}
        className="flex gap-3 items-center cursor-pointer"
      >
        <Badge
          sx={{ cursor: 'pointer', mt: 1 }}
          badgeContent={cartSimplified ? cartSimplified.length : 0}
          color="primary"
        >
          <CustomIcons.ShoppingCartIcon color="action" />
        </Badge>
        <div className="text-black ">
          <h1
            // onClick={handleClickOpen}
            className="cursor-pointer md:text-sm text-[10px] uppercase hover:text-secondary duration-200 font-bold mr-5"
          >
            Cart
          </h1>
          <div className="text-[10px] flex gap-1">
            <p className="hover:text-secondary duration-200">
              ({cartSimplified ? cartSimplified.length : 0}) Items
            </p>
          </div>
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        anchor="right"
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
        className="relative"
      >
        <CloseIcon
          className="absolute top-2 left-2 cursor-pointer"
          onClick={handleDrawerClose}
          fontSize="medium"
        />
        <Scrollbar>
          <Typography
            variant="h5"
            sx={{
              pt: 2,
              textAlign: 'center',
              marginRight: 'auto',
              marginLeft: 'auto',
              width: 'fit-content',
              borderBottom: 2,
            }}
          >
            Cart
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            {cartSimplified?.length > 0 ? (
              cartSimplified.map((product, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                  }}
                >
                  <img
                    src={product?.productId?.frontImage}
                    alt={product?.productId?.metaDescription}
                   
                    className='object-cover h-12 w-12 mr-3'
                  />
                  <div>
                    <Typography sx={{ fontSize: 13 }}>
                      {product?.productId?.name.length > 20
                        ? product?.productId?.name.slice(0, 20) + '...'
                        : product?.productId?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                      Price:{' '}
                      {product?.subtotal ? (
                        <>
                          {convertCurrency(
                            fromCurrency,
                            toCurrency,
                            product?.subtotal,
                            rateAEDtoUSD,
                          )}
                        </>
                      ) : (
                        <>
                          {convertCurrency(
                            fromCurrency,
                            toCurrency,
                            Number(product?.productId?.sellingPrice) *
                              Number(product?.quantity),
                            rateAEDtoUSD,
                          )}
                        </>
                      )}
                    </Typography>
                    <div className="mt-2">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          handleDecreaseQuantity(product?.productId?._id)
                        }
                        style={{
                          fontSize: '10px',
                          padding: '0px',
                          paddingRight: '10px',
                          paddingLeft: '10px',
                          minWidth: 0,
                          minHeight: 0,
                        }}
                      >
                        <CustomIcons.RemoveIcon />
                      </Button>
                      <span style={{ margin: '0 10px' }}>
                        {product?.quantity}
                      </span>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          handleIncreaseQuantity(product?.productId?._id)
                        }
                        style={{
                          fontSize: '10px',
                          padding: '0px',
                          paddingRight: '10px',
                          paddingLeft: '10px',
                          minWidth: 0,
                          minHeight: 0,
                        }}
                      >
                        <CustomIcons.AddIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Typography sx={{ fontSize: 13, textAlign: 'center' }}>
                No items in cart
              </Typography>
            )}
          </Box>

          <div
            style={{
              padding: '10px',
            }}
          >
            {cartSimplified?.length > 0 && (
              <Button sx={{width: '100%'}} variant="contained" onClick={handleCheckout}>
                Checkout
              </Button>
            )}
          </div>
        </Scrollbar>
      </Drawer>
    </>
  )
}
