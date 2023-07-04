import searchFill from '@iconify/icons-eva/search-fill'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Container,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  alpha,
} from '@mui/material'
// hooks
import useOffSetTop from '../../hooks/useOffSetTop'
import { MHidden } from '../../components/@material-extend'

import logo from '../../assets/logo/MainWebsiteLogo.jpg'
import Image from 'next/image'
import LoginFormModal from 'src/components/AuthModal/LoginModal'
import { useContext, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi'
import SignUpModal from 'src/components/AuthModal/SignUpModal'
import CartDrawer from '../../components/cart/CartDrawer'
import TopNavbar from './TopNavbar'
import { ContextData } from 'context/dataProviderContext'
import { loggedInUser } from 'apis/auth.api'
import AccountPopover from '../dashboard/AccountPopover'
import CategoryNav from './CategoryNav'

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

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}))

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 0;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  borderRadius: '10px',
  padding: '0px ',
  // position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  // backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  // [theme.breakpoints.up('md')]: {
  //   height: APPBAR_DESKTOP,
  //   padding: theme.spacing(0, 5),
  // },
}));



export default function MainNavbar() {
  const [open, setOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const isOffset = useOffSetTop(100)
  const { pathname } = useRouter()
  const { currentlyLoggedIn } = useContext(ContextData)
  const { role, name, image } = currentlyLoggedIn || {}
  const isHome = pathname === '/'

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
              // borderBottom: '1px solid #ddd',
              // height: { md: APP_BAR_DESKTOP - 16 },
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
            <NextLink href="/">
              {/* <Logo /> */}
              <Image
                src={logo}
                alt="Picture of the logo"
                width={100}
                height={40}
                className="cursor-pointer"
              />
            </NextLink>
            <SearchbarStyle>
            <Input
              className="border px-2 py-1 rounded"
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20,  }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            {/* <Button variant="contained" onClick={handleClose}>
              Search
            </Button> */}
            </SearchbarStyle>
            <Box sx={{ flexGrow: 1 }} />

            {/* <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              // isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden> */}

            {/* <Button variant="contained" onClick={handleClickOpen}>
            Login
          </Button> */}

            <CartDrawer />

            <div className="flex items-center">
              <div>
                <HiOutlineUser className="text-black text-3xl" />
              </div>
              <div className="text-black ">
                <h1 className="cursor-pointer text-sm uppercase hover:text-secondary duration-200 font-semibold">
                  Accounts
                </h1>
                {loggedInUser ? (
                  <div className="text-[10px] flex gap-1 justify-center">
                    <h1
                      onClick={handleClickOpen}
                      className="hover:text-secondary duration-200 cursor-pointer"
                    >
                      Edit
                    </h1>
                    <span> / </span>
                    <h1
                      onClick={handleSignUpOpen}
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

            {/* <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden> */}

            <LoginFormModal open={open} onClose={handleClose} />
            <SignUpModal open={signupOpen} onClose={handleClose} />
          </Container>
        </ToolbarStyle>
        <CategoryNav />
        {/* {isOffset && <ToolbarShadowStyle />} */}
      </AppBar>
    </>
  )
}
