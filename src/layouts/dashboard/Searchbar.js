import { Icon } from '@iconify/react'
import { useContext, useState } from 'react'
import searchFill from '@iconify/icons-eva/search-fill'
// material
import { styled, alpha } from '@mui/material/styles'
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
} from '@mui/material'
// components
import { MIconButton } from '../../components/@material-extend'
import { ContextData } from 'context/dataProviderContext'

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: 'white',
  // backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  // [theme.breakpoints.up('md')]: {
  //   height: APPBAR_DESKTOP,
  //   padding: theme.spacing(0, 5),
  // },
}))

// ----------------------------------------------------------------------

export default function Searchbar() {
  const { setSearchTerm } = useContext(ContextData)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <div className="flex text-black items-center">
            <h1 className="font-semibold">Search</h1>
            <MIconButton onClick={handleOpen}>
              <Icon icon={searchFill} width={20} height={20} />
            </MIconButton>
          </div>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              onChange={e => setSearchTerm(e.target.value)}
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
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  )
}
