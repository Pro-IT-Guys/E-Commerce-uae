import { filter } from 'lodash'
import { Icon } from '@iconify/react'
import { sentenceCase } from 'change-case'
import { useState, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
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

export default function UserList() {
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [selected, setSelected] = useState([])
  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch(
      `http://localhost:8000/api/v1/users?searchTerm=${filterName}&page=${page}&limit=${rowsPerPage}`
    )
      .then(res => res.json())
      .then(data => setUserList(data?.data))
  }, [filterName, page, rowsPerPage])

  const handleDeleteUser = userId => {
    console.log('Delete user')
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = userList?.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

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

  return (
    <DashboardLayout>
      <Page title="AYMi | User List">
        <Container maxWidth="lg">
          <h1 className="font-bold text-2xl">User List</h1>
          <div className="flex gap-2 text-sm mt-3 text-[#636262]">
            <p>Home - </p>
            <p>Dashboard - </p>
            <p>All User</p>
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
                    {userList.map(row => {
                      const { id, role, email, isVerified } = row
                      const isItemSelected =
                        selected.indexOf(row?.name?.firstName) !== -1

                      return (
                        <TableRow
                          hover
                          key={id}
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
                                {row?.name?.firstName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">
                            {isVerified ? 'Yes' : 'No'}
                          </TableCell>

                          <TableCell align="right">
                            {/* <UserMoreMenu
                              onDelete={() => handleDeleteUser(id)}
                              // userName={row?.name?.firstName}
                            /> */}
                            <MoreVertIcon className="cursor-pointer" />
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
