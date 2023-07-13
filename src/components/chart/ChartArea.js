import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'
//
import BaseOptionChart from './BaseOptionChart'
import { getOrderCountByStatus } from 'helpers/count'

// ----------------------------------------------------------------------

export default function ChartArea({ allOrder }) {
  const ORDER_DATE = allOrder.map(order => {
    const date = new Date(order.createdAt)
    const dateString = date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    return dateString
  })

  const CHART_DATA = [
    {
      name: 'Pending Order',
      data: getOrderCountByStatus(allOrder, 'Pending'),
    },
    {
      name: 'Processing Order',
      data: getOrderCountByStatus(allOrder, 'Processing'),
    },
    {
      name: 'Delivered Order',
      data: getOrderCountByStatus(allOrder, 'Delivered'),
    },
    {
      name: 'Canceled Order',
      data: getOrderCountByStatus(allOrder, 'Canceled'),
    },
  ]

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      type: 'datetime',
      categories: ORDER_DATE,
    },
    tooltip: { x: { format: 'dd/MM/yy HH:mm' } },
  })

  return (
    <ReactApexChart
      type="area"
      series={CHART_DATA}
      options={chartOptions}
      height={320}
    />
  )
}
