import {
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { BASE_URL } from 'apis/url'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DashboardLayout from 'src/layouts/dashboard'
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined'
import Scrollbar from 'src/components/Scrollbar'
import { UserListHead } from 'src/components/list'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'

const TABLE_HEAD = [
  { id: 'sr', label: 'SR', alignRight: false },
  { id: 'title', label: 'Product Title', alignRight: false },
  { id: 'size', label: 'Size', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'total', label: 'Total Price', alignRight: true },
]

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState()
  const router = useRouter()
  const params = router.query.id
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    fetch(`${BASE_URL}/order/${params}`)
      .then(res => res.json())
      .then(data => setOrderDetails(data.data))
      .catch(err => console.log(err))
  }, [params])

  const {
    _id,
    shippingAddress,
    deliveryFee,
    deliveryStatus,
    email,
    isPaid,
    orderItems,
    phoneNumber,
    subTotal,
    userId,
    paymentMethod,
  } = orderDetails || {}

  const { name, image, role } = userId || {}
  const { country, city, state, address_line } = shippingAddress || {}


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(Number(event.target.value, 10))
    setPage(0)
  }

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <h1 className="font-bold text-2xl">Order Details</h1>
        <div className="flex gap-2 text-sm mt-3 text-[#636262]">
          <p>Home - </p>
          <p>Dashboard - </p>
          <p>Order Details</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-5">
          <div className="shadow-md p-5 rounded-md text-center">
            <div>
              <img
                src={
                  image
                    ? image
                    : 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'
                }
                alt=""
                className="h-32 w-32 rounded-full mx-auto"
              />
            </div>
            <h1 className="mt-2 font-semibold">
              {name?.firstName} {name?.lastName} ({role})
            </h1>
            <p className="text-sm   text-[#666]">{email}</p>
          </div>
          <div className="shadow-md p-5 rounded-md">
            <div className="flex items-center gap-2">
              <h1 className="text-start font-semibold text-xl">
                Shipping Info
              </h1>
              <span
                className={`${
                  deliveryStatus === 'Processing' &&
                  'bg-warning text-white p-2 rounded text-xs'
                } ${
                  deliveryStatus === 'Pending' &&
                  'bg-error text-white p-2 rounded text-xs'
                } ${
                  deliveryStatus === 'Delivered' &&
                  'bg-success text-white p-2 rounded text-xs'
                } ${
                  deliveryStatus === 'Cancelled' &&
                  'bg-[#b9b9b9] text-white p-2 rounded text-xs'
                }`}
              >
                {deliveryStatus}
              </span>
            </div>
            <div className="mt-5">
              <div className="flex items-center text-start gap-2 border-b pb-4">
                <div className="bg-primary p-2 flex items-center justify-center text-white rounded-full">
                  <PinDropOutlinedIcon />
                </div>
                <div>
                  <h1 className="font-semibold">Address</h1>
                  <p className="text-xs font-semibold text-[#666]">
                    {state}, {city}, {country}.
                  </p>
                  <p className="text-xs font-semibold text-[#666]">
                    {address_line}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-start gap-2 border-b py-4">
                <div className="bg-primary p-2 flex items-center justify-center text-white rounded-full">
                  <PhoneInTalkOutlinedIcon />
                </div>
                <div>
                  <h1 className="font-semibold">Phone</h1>
                  <p className="text-xs font-semibold text-[#666]">
                    {phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-start gap-2  pt-4">
                <div className="bg-primary p-2 flex items-center justify-center text-white rounded-full">
                  <DraftsOutlinedIcon />
                </div>
                <div>
                  <h1 className="font-semibold">Email</h1>
                  <p className="text-xs font-semibold text-[#666]">{email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-md p-5 rounded-md">
            <h1 className="text-start font-semibold text-xl mb-3">
              Payment Info
            </h1>
            <div className="space-y-3 mt-3 ">
              <div className="shadow py-1 px-2  text-sm rounded">
                <span className="font-semibold">Invoice : </span>
                <span className="text-sm">{_id?.slice(0, 10)}</span>
              </div>
              <div className="  shadow py-1 px-2 text-sm rounded">
                <span className="font-semibold">Payment Method : </span>
                <span className="text-sm">{paymentMethod}</span>
              </div>
              <div className="  shadow py-1 px-2 text-sm rounded">
                <span className="font-semibold">Payment Status : </span>
                <span className="text-sm text-primary">
                  {' '}
                  {isPaid === 'true' && 'Success'}
                </span>
              </div>
              <div className="  shadow py-1 px-2 text-sm rounded">
                <span className="font-semibold">Total Items : </span>
                <span className="text-sm "> {orderItems?.length}</span>
              </div>
              <div className="  shadow py-1 px-2 text-sm rounded">
                <span className="font-semibold">Shipping Fee : </span>
                <span className="text-sm"> ${deliveryFee}</span>
              </div>
              <div className="  shadow py-1 px-2 text-sm rounded">
                <span className="font-semibold">Subtotal : </span>
                <span className="text-sm"> ${subTotal}</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mt-10 text-2xl font-semibold mb-2 ml-1">Order List</h1>
        <Card className="py-3">
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderItems?.length}
                  // numSelected={selected.length}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {orderItems?.map((row, index) => {
                    const { color, quantity, size, product } = row
                    // const isItemSelected =
                    //   selected.indexOf(row?.userId?.name?.firstName) !== -1

                    return (
                      <TableRow
                        hover
                        key={index}
                        tabIndex={-1}
                        role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                      >
                        <TableCell component="th" scope="row" padding="none">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            {/* <Avatar alt={row?.name?.firstName} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {++index}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          {product?.name?.slice(0, 20) + '...'}
                        </TableCell>
                        <TableCell align="left">{size}</TableCell>
                        <TableCell align="left">{color}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                        <TableCell align="left">
                          {product?.sellingPrice}
                        </TableCell>
                        <TableCell align="right">
                          {product?.sellingPrice * quantity}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        <div className="flex mt-10  ">
          <div
            onClick={() => router.back()}
            className="bg-primary px-2 py-1 text-sm rounded text-white cursor-pointer"
          >
            <KeyboardBackspaceOutlinedIcon /> Back
          </div>
        </div>
      </Container>
    </DashboardLayout>
  )
}
