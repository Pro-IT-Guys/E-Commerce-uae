import { Icon } from '@iconify/react'
import { useContext, useRef, useState } from 'react'
import homeFill from '@iconify/icons-eva/home-fill'
import personFill from '@iconify/icons-eva/person-fill'
import settings2Fill from '@iconify/icons-eva/settings-2-fill'
// next
import NextLink from 'next/link'
// material
import { alpha } from '@mui/material/styles'
import {
  Box,
  Avatar,
  Button,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material'
// components
import MenuPopover from '../../components/MenuPopover'
import { MIconButton } from '../../components/@material-extend'
import { ContextData } from 'context/dataProviderContext'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  { label: 'Home', icon: homeFill, linkTo: '/', role: 'user' },
  { label: 'Profile', icon: personFill, linkTo: '#', role: 'user' },
  { label: 'Settings', icon: settings2Fill, linkTo: '#' },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const { currentlyLoggedIn, setUpdate } = useContext(ContextData)
  const { role, email, name, image } = currentlyLoggedIn || {}
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    router.push('/')
    setUpdate(Math.random())
  }

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: theme => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar
          alt="My Avatar"
          src="/static/mock-images/avatars/avatar_default.jpg"
        />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {name?.firstName} {name?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <NextLink href={'/'}>
          <MenuItem
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <HomeOutlinedIcon className="mr-3" />
            Home
          </MenuItem>
        </NextLink>

        {role === 'admin' && (
          <NextLink href={'/dashboard'}>
            <MenuItem
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <ShoppingCartOutlinedIcon className="mr-3" />
              Dashboard
            </MenuItem>
          </NextLink>
        )}

        <NextLink href={'/dashboard/app/my-profile'}>
          <MenuItem
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <PersonOutlineOutlinedIcon className="mr-3" />
            My Account
          </MenuItem>
        </NextLink>

        {role === 'admin' && (
          <NextLink href={'/dashboard/app/my-profile'}>
            <MenuItem
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <ShoppingCartOutlinedIcon className="mr-3" />
              My Orders
            </MenuItem>
          </NextLink>
        )}

        {role === 'admin' && (
          <NextLink href={'/dashboard/app/orders'}>
            <MenuItem
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <ShoppingCartOutlinedIcon className="mr-3" />
              All Orders
            </MenuItem>
          </NextLink>
        )}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={handleLogOut}
            fullWidth
            color="inherit"
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
