import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Card } from '@mui/material'
import ProductDetails from './ProductDetails'
import ProductReview from './ProductReview'
import ProductSizeChart from './ProductSizeChart'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function ProductDetailsTab({product}) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card className='mt-5'>
      <Box sx={{ width: '100%' }} className='px-5'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab  label="Description" {...a11yProps(0)} />
            <Tab label="Review" {...a11yProps(1)} />
            <Tab label="Size Chart" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProductDetails product={product}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ProductReview product={product}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
         <ProductSizeChart/>
        </CustomTabPanel>
      </Box>
    </Card>
  )
}
