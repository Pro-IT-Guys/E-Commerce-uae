import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { paramCase } from 'change-case'
import { useRef, useState } from 'react'
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined'
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined'
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
// routes

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  // userName: PropTypes.string
}

export default function UserMoreMenu({ id, handleUpdateOrder }) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            handleUpdateOrder(id, 'Pending')
            setIsOpen(false)
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <AutorenewOutlinedIcon />
            {/* <Icon icon={trash2Outline} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText
            primary="Pending"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleUpdateOrder(id, 'Processing')
            setIsOpen(false)
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <DirectionsRunOutlinedIcon />
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText
            primary="Processing"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleUpdateOrder(id, 'Delivered')
            setIsOpen(false)
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <DeliveryDiningOutlinedIcon />
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText
            primary="Delivered"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleUpdateOrder(id, 'Cancelled')
            setIsOpen(false)
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <CancelOutlinedIcon />
            {/* <Icon icon={CancelOutlinedIcon} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText
            primary="Cancelled"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  )
}
