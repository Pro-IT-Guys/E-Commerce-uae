import { merge } from 'lodash'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import BaseOptionChart from './BaseOptionChart'
import { CATEGORY_OPTION_ARRAY } from 'constant/product'
import { getOrderCountByCategory } from 'helpers/count'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function ChartLine({ allOrder }) {
  const [isBrowser, setIsBrowser] = useState(false)

  const COUNT = CATEGORY_OPTION_ARRAY.map(category => {
    return getOrderCountByCategory(allOrder, category)
  })

  const CHART_DATA = [{ name: 'Order', data: COUNT }]
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: CATEGORY_OPTION_ARRAY,
    },
  })

  return isBrowser ? (
    <ReactApexChart
      type="line"
      series={CHART_DATA}
      options={chartOptions}
      height={320}
    />
  ) : null
}
