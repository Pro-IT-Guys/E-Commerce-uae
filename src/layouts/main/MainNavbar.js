import searchFill from '@iconify/icons-eva/search-fill'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { styled } from '@mui/material/styles'
import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Input,
  InputAdornment,
} from '@mui/material'
// hooks
import useOffSetTop from '../../hooks/useOffSetTop'

import logo from '../../assets/logo/aymi-logo2.jpg'
import Image from 'next/image'
import { useContext, useState } from 'react'
import TopNavbar from './TopNavbar'
import CategoryNav from './CategoryNav'
import dynamic from 'next/dynamic'
import { ContextData } from '../../../context/dataProviderContext'
const LoginFormModal = dynamic(() =>
  import('../../components/AuthModal/LoginModal'),
)
const SignUpModal = dynamic(() =>
  import('../../components/AuthModal/SignUpModal'),
)
const CartDrawer = dynamic(() => import('../../components/cart/CartDrawer'))

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 0
const APP_BAR_DESKTOP = 0

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  backgroundColor: 'white',
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
  },
}))

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 0

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  borderRadius: '10px',
  padding: '0px ',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.down('md')]: {
    visibility: 'hidden',
  },
}))

export default function MainNavbar() {
  const [open, setOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const isOffset = useOffSetTop(100)
  const { currentlyLoggedIn, setSearchTerm, setUpdate } =
    useContext(ContextData)
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSignUpOpen = () => {
    setSignupOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSignupOpen(false)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    router.push('/')
    setUpdate(Math.random())
  }

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
        }}
      >
        <TopNavbar />
        <ToolbarStyle
          disableGutters
          sx={{
            ...(isOffset && {
              bgcolor: 'background.default',
            }),
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className="md:w-[15%] w-[25%]">
              <NextLink href="/">
                <Image
                  src={logo}
                  alt="Picture of the logo"
                  width={150}
                  height={50}
                  loading="lazy"
                  className="cursor-pointer object-cover w-full"
                />
              </NextLink>
            </div>

            <div className="w-[80%] md:block hidden">
              <SearchbarStyle>
                <Input
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border px-2 py-1 rounded md:block hidden"
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder="Search…"
                  startAdornment={
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: 'text.disabled', width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  }
                  sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                />
              </SearchbarStyle>
            </div>

            <div className="flex items-center ">
              <CartDrawer />

              <div className="flex md:gap-0 gap-1 items-center md:ml-0 ml-1">
                <div>
                  <Icon
                    icon="eva:people-outline"
                    className="text-gray-600 md:text-3xl text-2xl"
                  />
                </div>
                <div className="text-black ">
                  <h1
                    onClick={() =>
                      currentlyLoggedIn?.name &&
                      router.push('/dashboard/app/my-profile')
                    }
                    className="cursor-pointer  md:text-sm text-[10px] uppercase hover:text-secondary duration-200 font-bold "
                  >
                    Accounts
                  </h1>
                  {currentlyLoggedIn?.name ? (
                    <div className="text-[10px] flex gap-1 justify-center">
                      <h1
                        onClick={() => router.push('/dashboard/app/my-profile')}
                        className="hover:text-secondary duration-200 cursor-pointer"
                      >
                        Edit
                      </h1>
                      <span> / </span>
                      <h1
                        onClick={handleLogOut}
                        className="hover:text-secondary duration-200 cursor-pointer"
                      >
                        Logout
                      </h1>
                    </div>
                  ) : (
                    <div className="text-[10px] flex gap-1 justify-center">
                      <h1
                        onClick={handleClickOpen}
                        className="hover:text-secondary duration-200 cursor-pointer"
                      >
                        Login
                      </h1>
                      <span> / </span>
                      <h1
                        onClick={handleSignUpOpen}
                        className="hover:text-secondary duration-200 cursor-pointer"
                      >
                        Signup
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <LoginFormModal open={open} onClose={handleClose} />
            <SignUpModal open={signupOpen} onClose={handleClose} />
          </Container>
        </ToolbarStyle>
        <CategoryNav />
      </AppBar>
    </>
  )
}
