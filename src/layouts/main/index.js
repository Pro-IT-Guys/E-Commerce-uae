import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import CustomLoadingScreen from '../../components/CustomLoadingScreen'
// import MainNavbar from './MainNavbar'

const MainFooter = dynamic(() => import('./MainFooter'), { ssr: false })
const MainNavbar = dynamic(() => import('./MainNavbar'), {
  loading: () => <CustomLoadingScreen />,
})

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
}

export default function MainLayout({ children }) {
  return (
    <>
      <MainNavbar />
      <div>{children}</div>

      <MainFooter />
    </>
  )
}
