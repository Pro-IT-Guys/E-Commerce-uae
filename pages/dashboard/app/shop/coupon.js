import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { createCupon, getAllCupon } from '../../../../apis/cupon.api'
import { useEffect, useState } from 'react'
import CustomLoadingScreen from '../../../../src/components/CustomLoadingScreen'
import Page from '../../../../src/components/Page'
import { ButtonAnimate } from '../../../../src/components/animate'
import DashboardLayout from '../../../../src/layouts/dashboard'
import { toast } from 'react-hot-toast'

export default function Cupon() {
  const [discountParcentage, setDiscountParcentage] = useState(0)
  const [expireDate, setExpireDate] = useState(new Date())
  const [cuponList, setCuponList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const _retriveCuponList = async () => {
      const response = await getAllCupon()
      setCuponList(response?.data)
      setLoading(false)
    }
    _retriveCuponList()
  }, [])

  const handleCreateCupon = async () => {
    if (!discountParcentage || !expireDate)
      return toast.error('Please fill all the fields')
    const response = await createCupon({
      discount: discountParcentage,
      expireDate,
    })
    console.log(response)
    if (response?.success) {
      toast.success('Cupon Created Successfully')
      setCuponList([...cuponList, response?.data])
      setDiscountParcentage(0)
      setExpireDate(new Date())
    }
  }

  if (loading) return <CustomLoadingScreen />

  return (
    <DashboardLayout>
      <Page title="AYMi | Coupon">
        <Container maxWidth="lg">
          <Card>
            <CardHeader
              title="Create Coupon"
              titleTypographyProps={{
                sx: {
                  mb: 2.5,
                  lineHeight: '2rem !important',
                  letterSpacing: '0.15px !important',
                },
              }}
            />

            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Discount Parcentage"
                    value={discountParcentage}
                    onChange={e => setDiscountParcentage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Expire Date"
                    value={expireDate}
                    type="date"
                    onChange={e => setExpireDate(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ButtonAnimate mediumClick={true}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateCupon}
                    >
                      Create Coupon
                    </Button>
                  </ButtonAnimate>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ marginTop: 4 }}>
            <CardHeader
              title="Coupon List"
              titleTypographyProps={{
                sx: {
                  mb: 2.5,
                  lineHeight: '2rem !important',
                  letterSpacing: '0.15px !important',
                },
              }}
            />
            <CardContent>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold' }}
                        >
                          Coupon Code
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold' }}
                        >
                          Discount
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold' }}
                        >
                          Expire Date
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cuponList?.map((cupon, index) => (
                      <TableRow key={index}>
                        <TableCell>{cupon?.code}</TableCell>
                        <TableCell>{cupon?.discount} %</TableCell>
                        <TableCell>
                          {new Date(cupon?.expireDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </Page>
    </DashboardLayout>
  )
}
