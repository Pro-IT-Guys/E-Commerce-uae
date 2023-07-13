import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { getOrderById } from 'apis/order.api'
import PrintableTable from 'src/components/dashboard/table/PrintableTable'
import CustomLoadingScreen from 'src/components/CustomLoadingScreen'

const OrderId = () => {
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState({})
  const router = useRouter()

  //--------------------> Get orderId from URL <---------------
  useEffect(() => {
    const pathname = router.asPath
    const id = pathname.split('/')[4]
    setOrderId(id)
    setLoading(false)
  }, [router])

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      if (orderId !== '[orderId]') {
        const order = await getOrderById({ orderId })
        setOrderData(order?.data)
      }
      setLoading(false)
    }

    fetchData()
  }, [orderId])

  if (loading || !orderData || Object.keys(orderData).length === 0) {
    return <CustomLoadingScreen />
  } else {
    return (
      <>
        <PrintableTable orderData={orderData} />
      </>
    )
  }
}

export default OrderId
