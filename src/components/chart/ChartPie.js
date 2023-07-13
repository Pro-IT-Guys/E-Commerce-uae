import { merge } from 'lodash'
import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
//
import BaseOptionChart from './BaseOptionChart'
import { CATEGORY_OPTION_ARRAY } from 'constant/product'
import { getProductCountByCategory } from 'helpers/count'

// ----------------------------------------------------------------------

export default function ChartPie({ allProduct }) {
  const CHART_DATA = CATEGORY_OPTION_ARRAY.map(category => {
    return getProductCountByCategory(allProduct, category)
  })

  const chartOptions = merge(BaseOptionChart(), {
    labels: CATEGORY_OPTION_ARRAY,
    legend: {
      position: 'right',
      offsetX: -20,
      offsetY: 64,
      itemMargin: { vertical: 8 },
    },
    stroke: { show: false },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  })

  return (
    <ReactApexChart
      type="pie"
      series={CHART_DATA}
      options={chartOptions}
      width={400}
    />
  )
}
