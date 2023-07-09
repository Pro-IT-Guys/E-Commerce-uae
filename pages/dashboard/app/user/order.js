import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { sentenceCase } from 'change-case'
import { useState, useEffect, useContext } from 'react'
import plusFill from '@iconify/icons-eva/plus-fill'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
// material
import { useTheme } from '@mui/material/styles'
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material'
// redux
import useSettings from 'src/hooks/useSettings'
import Page from 'src/components/Page'
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from 'src/components/list'
import Scrollbar from 'src/components/Scrollbar'
import Label from 'src/components/Label'
import DashboardLayout from 'src/layouts/dashboard'
import { ContextData } from 'context/dataProviderContext'
import { convertCurrency } from 'helpers/currencyHandler'
import { useRouter } from 'next/router'
import OrderMoreMenu from 'src/components/list/OrderMoreMenu'
import { BASE_URL } from 'apis/url'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'serial', label: 'Serial', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'shippingAddress', label: 'Shipping Address', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'items', label: 'Total Items', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'method', label: 'Payment Method', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'view', label: 'View', alignRight: true },
]

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  if (query) {
    return filter(
      array,
      _user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    )
  }
  return stabilizedThis.map(el => el[0])
}

export default function UserOrders() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderList, setOrderList] = useState([])
  const { fromCurrency, toCurrency, currentlyLoggedIn } =
    useContext(ContextData)
  const [update, setUpdate] = useState('')

  const { _id } = currentlyLoggedIn || {}

  useEffect(() => {
    fetch(`${BASE_URL}/order/user/${_id}`)
      .then(res => res.json())
      .then(data => setOrderList(data?.data))
  }, [_id, ])

  console.log(orderList)
  const handleDeleteUser = userId => {
    console.log('Delete user')
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = orderList?.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
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

          <Card className="mt-5 pt-3">
            {/* <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            /> */}

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={orderList?.length}
                  />
                  <TableBody>
                    {orderList?.map((row,index) => {
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
                      return (
                        <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                             <TableCell align="left">
                            {++index}
                          </TableCell>
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
                              subTotal
                            )}
                          </TableCell>
                          <TableCell align="left"> {paymentMethod}</TableCell>
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
                            <RemoveRedEyeOutlinedIcon
                              onClick={() =>
                                router.push(
                                  `/dashboard/app/orders/details/${_id}`
                                )
                              }
                              className="cursor-pointer"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orderList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Card>
        </Container>
      </Page>
    </DashboardLayout>
  )
}
