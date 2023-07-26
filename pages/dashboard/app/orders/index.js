import { useState, useEffect, useContext } from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
import Page from '../../../../src/components/Page'
import { UserListHead, UserListToolbar } from '../../../../src/components/list'
import Scrollbar from '../../../../src/components/Scrollbar'
import DashboardLayout from '../../../../src/layouts/dashboard'
import { ContextData } from '../../../../context/dataProviderContext'
import { convertCurrency } from '../../../../helpers/currencyHandler'
import { useRouter } from 'next/router'
import OrderMoreMenu from '../../../../src/components/list/OrderMoreMenu'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'shippingAddress', label: 'Shipping Address', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'items', label: 'Total Items', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'method', label: 'Payment Method', alignRight: false },
  { id: 'view', label: 'View', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
]

// ----------------------------------------------------------------------

export default function AllOrders() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [userList, setUserList] = useState([])
  const { fromCurrency, toCurrency } = useContext(ContextData)
  const [update, setUpdate] = useState('')

  useEffect(() => {
    fetch(
      `https://server.aymifashion.com/api/v1/order?searchTerm=${filterName}&page=${page}&limit=${rowsPerPage}`,
    )
      .then(res => res.json())
      .then(data => setUserList(data?.data))
  }, [filterName, page, rowsPerPage, update])

  const handleFilterByName = event => {
    setFilterName(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(Number(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0

  const handleUpdateOrder = (id, status) => {
    fetch(`https://server.aymifashion.com/api/v1/order/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deliveryStatus: status }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUpdate(Math.random())
      })
  }

  return (
    <DashboardLayout>
      <Page title="AYMi | Order List">
        <Container maxWidth="xl">
          <h1 className="font-bold text-2xl">Order List</h1>
          <div className="flex gap-2 text-sm mt-3 text-[#636262]">
            <p>Home - </p>
            <p>Dashboard - </p>
            <p>All Orders</p>
          </div>

          <Card className="mt-5">
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    // order={order}
                    // orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={userList.length}
                    // numSelected={selected.length}
                    // onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {userList?.map(row => {
                      const {
                        _id,
                        role,
                        email,
                        phoneNumber,
                        subTotal,
                        deliveryStatus,
                        paymentMethod,
                        orderItems,
                        shippingAddress,
                      } = row
                      const isItemSelected =
                        selected.indexOf(row?.userId?.name?.firstName) !== -1

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={row?.name?.firstName} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {row?.userId?.name?.firstName}{' '}
                                {row?.userId?.name?.lastName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {shippingAddress?.address_line}
                          </TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">
                            {orderItems?.length} items
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {convertCurrency(
                              fromCurrency,
                              toCurrency,
                              subTotal,
                            )}
                          </TableCell>
                          <TableCell align="left"> {paymentMethod}</TableCell>
                          <TableCell align="left">
                            <RemoveRedEyeOutlinedIcon
                              onClick={() =>
                                router.push(
                                  `/dashboard/app/orders/details/${_id}`,
                                )
                              }
                              className="cursor-pointer"
                            />
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            <span
                              className={`font-semibold ${
                                deliveryStatus === 'Pending' && 'text-secondary'
                              } ${
                                deliveryStatus === 'Delivered' && 'text-success'
                              } ${
                                deliveryStatus === 'Cancelled' &&
                                'text-[#b9b9b9]'
                              } ${
                                deliveryStatus === 'Processing' &&
                                'text-warning'
                              }  `}
                            >
                              {' '}
                              {deliveryStatus}
                            </span>
                          </TableCell>

                          <TableCell align="right">
                            <OrderMoreMenu
                              handleUpdateOrder={handleUpdateOrder}
                              id={_id}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    </DashboardLayout>
  )
}
