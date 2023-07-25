
import { styled } from '@mui/material/styles'
// components
import { useState } from 'react'
import CustomLoadingScreen from '../src/components/CustomLoadingScreen'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Page = dynamic(() => import('../src/components/Page'))
const MainLayout = dynamic(() => import('../src/layouts/main'))
const Banner = dynamic(() => import('../src/components/Home/Banner/Banner'))
const Products = dynamic(() => import('../src/components/Home/Products/Products'))

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
})

// ----------------------------------------------------------------------

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading ? (
        <CustomLoadingScreen />
      ) : (
        <MainLayout>
          <RootStyle title="AYMi" id="move_top">
            <Banner />
            <Products />
          </RootStyle>
        </MainLayout>
      )}
    </>
  )
}
