import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import minusFill from '@iconify/icons-eva/minus-fill'
import trash2Fill from '@iconify/icons-eva/trash-2-fill'
// material
import { styled } from '@mui/material/styles'
import {
  Box,
  Table,
  Stack,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { MIconButton } from '../@material-extend'
import { convertCurrencyForCalculation } from 'helpers/currencyHandler'
import { ContextData } from 'context/dataProviderContext'
//

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}))

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
}))

// ----------------------------------------------------------------------

function Incrementer({
  selectedProduct,
  setSelectedProduct,
  id,
  setQuantity,
  available,
  quantity,
}) {
  const decreaseQuantity = () => {
    let newQuantity = Number(quantity) - 1
    if (newQuantity < 1) {
      newQuantity = 1
    }
    setQuantity(newQuantity)
  }

  const increaseQuantity = () => {
    let newQuantity = Number(quantity) + 1
    if (newQuantity > available) {
      newQuantity = available
    }
    setQuantity(newQuantity)
  }

  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton
          size="small"
          color="inherit"
          onClick={() => {
            setSelectedProduct(id)
            decreaseQuantity()
          }}
          disabled={quantity <= 1}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton
          size="small"
          color="inherit"
          onClick={() => {
            setSelectedProduct(id)
            increaseQuantity()
          }}
          disabled={quantity >= available}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  )
}

ProductList.propTypes = {
  formik: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
}

export default function ProductList({
  item,
  setProduct,
  product,
  setSelectedProductIdForDelete,
  handleProductRemove,
}) {
  const { toCurrency, fromCurrency } = useContext(ContextData)
  const [quantity, setQuantity] = useState(item.quantity)
  const [available, setAvailable] = useState(item.productId.quantity)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { color, size } = item
  const { name, frontImage, sellingPrice } = item.productId

  useEffect(() => {
    setQuantity(item.quantity)
    setAvailable(item.productId.quantity)
  }, [item])

  useEffect(() => {
    if (selectedProduct === item.productId._id) {
      const newProduct = product.map(singleProduct => {
        if (singleProduct.productId._id === item.productId._id) {
          return {
            ...singleProduct,
            quantity,
          }
        }
        return singleProduct
      })
      setProduct(newProduct)
    }
  }, [quantity, selectedProduct])

  // console.log(sellingPrice, quantity)

  return (
    <TableRow>
      <TableCell>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ThumbImgStyle alt="product image" src={frontImage} />
          <Box>
            <Typography
              noWrap
              variant="subtitle2"
              sx={{ maxWidth: 240, mb: 0.5 }}
            >
              {name}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              divider={
                <Divider
                  orientation="vertical"
                  sx={{
                    height: 14,
                    alignSelf: 'center',
                  }}
                />
              }
            >
              <Typography variant="body2">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  size:&nbsp;
                </Typography>
                {size}
              </Typography>

              <Typography variant="body2">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  color: {color};
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </TableCell>

      <TableCell align="left">
        {toCurrency === 'USD' && '$ '}
        {convertCurrencyForCalculation(fromCurrency, toCurrency, sellingPrice)}
        {toCurrency === 'AED' && ' AED'}
      </TableCell>

      <TableCell align="left">
        <Incrementer
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          id={item.productId._id}
          setQuantity={setQuantity}
          quantity={quantity}
          available={available}
        />
      </TableCell>

      <TableCell align="right">
        {toCurrency === 'USD' && '$ '}
        {convertCurrencyForCalculation(
          fromCurrency,
          toCurrency,
          Number(sellingPrice) * Number(quantity)
        )}{' '}
        {toCurrency === 'AED' && 'AED'}
      </TableCell>

      <TableCell align="right">
        <MIconButton>
          <Icon
            onClick={() => {
              handleProductRemove(item._id)
            }}
            icon={trash2Fill}
            width={20}
            height={20}
          />
        </MIconButton>
      </TableCell>
    </TableRow>
  )
}
