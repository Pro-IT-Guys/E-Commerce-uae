import { useState, useEffect } from 'react'
// material
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
} from '@mui/material'
import Page from '../../../../src/components/Page'
import { UserListHead, UserListToolbar } from '../../../../src/components/list'
import Scrollbar from '../../../../src/components/Scrollbar'
import DashboardLayout from '../../../../src/layouts/dashboard'
import { BASE_URL } from '../../../../apis/url'
import ProductTableRowItem from '../../../../src/components/Products/ProductTableRowItem'
import { useContext } from 'react'
import { ContextData } from '../../../../context/dataProviderContext'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'code', label: 'Product Code', alignRight: false },
  { id: 'style', label: 'Style', alignRight: false },
  { id: 'fabric', label: 'Fabric', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'size', label: 'Size', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
]

// ----------------------------------------------------------------------

export default function ProductList() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [productList, setProductList] = useState([])
  const [update, setUpdate] = useState('')
  const { searchTerm } = useContext(ContextData)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (searchValue === '') {
      fetch(`${BASE_URL}/product?&page=${page}&limit=${rowsPerPage}`)
        .then(res => res.json())
        .then(data => setProductList(data?.data))
    } else {
      fetch(
        `${BASE_URL}/product?searchTerm=${searchValue}&page=${page}&limit=${rowsPerPage}`,
      )
        .then(res => res.json())
        .then(data => setProductList(data?.data))
    }
  }, [page, rowsPerPage, searchTerm, update, searchValue])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(Number(event.target.value, 10))
    setPage(0)
  }

  const searchTermHandler = value => {
    setSearchValue(value)
  }

  return (
    <DashboardLayout>
      <Page title="AYMi | All Products">
        <Container maxWidth="xl">
          <h1 className="font-bold text-2xl">Product List</h1>
          <div className="flex gap-2 text-sm mt-3 text-[#636262]">
            <p>Home - </p>
            <p>Dashboard - </p>
            <p>All Products</p>
          </div>


          <div className='mt-3'>
            <input
              type='search'
              onChange={e => searchTermHandler(e.target.value)}
              placeholder='Search Product ...'
              className='border border-[#E1E1E1] rounded-md px-2 py-3 w-[80%] mt-5 focus:outline-none'
            ></input>
          </div>

          <Card className="mt-5 py-2">

            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={productList.length}
                  />
                  <TableBody>
                    {productList?.map(product => (
                      <ProductTableRowItem
                        key={product?._id}
                        row={product}
                        setUpdate={setUpdate}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={productList.length}
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
