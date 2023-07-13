import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material'
// layouts
import DashboardLayout from 'src/layouts/dashboard'
// hooks
import useSettings from 'src/hooks/useSettings'
// components
import Page from 'src/components/Page'
import AccountsCard from 'src/components/dashboard/AccountAnalytics'
import useAuthAdmin from 'src/utils/authMiddleware'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'
import { getALlOrders } from 'apis/order.api'
import CustomLoadingScreen from 'src/components/CustomLoadingScreen'
import { getALlUsers } from 'apis/user.api'
import { ContextData } from 'context/dataProviderContext'
import { getAllProduct } from 'apis/product.api'
const ChartPie = dynamic(() => import('src/components/chart/ChartPie'), {
  ssr: false,
})
const ChartLine = dynamic(() => import('src/components/chart/ChartLine'), {
  ssr: false,
})
const ChartArea = dynamic(() => import('src/components/chart/ChartArea'), {
  ssr: false,
})

// ----------------------------------------------------------------------

const PageOne = () => {
  const { themeStretch } = useSettings()
  const { onlineUsers } = useContext(ContextData)
  const [loading, setLoading] = useState(false)
  const [allUser, setAllUser] = useState([])
  const [allProduct, setAllProduct] = useState([])
  const [allOrder, setAllOrder] = useState([])
  const [totalSellUSD, setTotalSellUSD] = useState(0)
  const [totalSellAED, setTotalSellAED] = useState(0)

  useEffect(() => {
    setLoading(true)
    const retriveData = async () => {
      // get all orders
      const response = await getALlOrders()
      if (response?.statusCode === 200) {
        setAllOrder(response.data)
        setTotalSellUSD(getTotalSell(response.data, 'yes', 'USD'))
        setTotalSellAED(getTotalSell(response.data, 'yes', 'AED'))
      }

      // get all users
      const users = await getALlUsers()
      if (users?.statusCode === 200) {
        setAllUser(users.data)
      }

      // get all product
      const products = await getAllProduct()
      if (products?.statusCode === 200) {
        setAllProduct(products.data)
      }

      setLoading(false)
    }

    retriveData()
  }, [])

  const getTotalSell = (orderData, condition, currency) => {
    let total = 0
    orderData.forEach(order => {
      if (order.isPaid === condition && order.currency === currency)
        total += Number(order.subTotal)
    })
    return total
  }

  if (loading) return <CustomLoadingScreen />

  // console.log('allOrder', allOrder)

  return (
    <DashboardLayout>
      <Page title="AYMi | Analytics">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12}>
              <AccountsCard
                totalSellUSD={totalSellUSD}
                totalSellAED={totalSellAED}
                allUser={allUser}
                onlineUsers={onlineUsers}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  height: {
                    xs: 'auto',
                    md: '482px',
                  },
                }}
              >
                <CardHeader
                  title="Product Analysis"
                  titleTypographyProps={{
                    sx: {
                      mb: 2.5,
                      lineHeight: '2rem !important',
                      letterSpacing: '0.15px !important',
                      marginTop: '-25px',
                    },
                  }}
                />
                <CardContent>
                  <ChartPie allProduct={allProduct} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  p: 3,
                  height: {
                    xs: 'auto',
                    md: '482px',
                  },
                }}
              >
                <CardHeader
                  title="Order Analysis"
                  titleTypographyProps={{
                    sx: {
                      mb: 2.5,
                      lineHeight: '2rem !important',
                      letterSpacing: '0.15px !important',
                      marginTop: '-25px',
                    },
                  }}
                />
                <CardContent>
                  <ChartLine allOrder={allOrder} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  p: 3,
                  height: {
                    xs: 'auto',
                    md: '482px',
                  },
                }}
              >
                <CardHeader
                  title="Order Analysis"
                  titleTypographyProps={{
                    sx: {
                      mb: 2.5,
                      lineHeight: '2rem !important',
                      letterSpacing: '0.15px !important',
                      marginTop: '-25px',
                    },
                  }}
                />
                <CardContent>
                  <ChartArea allOrder={allOrder} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  )
}

export default useAuthAdmin(PageOne)
