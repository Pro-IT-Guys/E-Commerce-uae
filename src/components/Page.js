import Head from 'next/head'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
// material
import { Box } from '@mui/material'

// ----------------------------------------------------------------------

const Page = forwardRef(
  (
    { children, title = '', metaDescription = '', metaImage = '', ...other },
    ref
  ) => (
    <Box ref={ref} {...other}>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={metaImage} />
        <meta name="description" content={metaDescription} />
      </Head>
      {children}
    </Box>
  )
)

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

export default Page
