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
import DeleteModal from '../Modal/DeleteModal'
// routes

// ----------------------------------------------------------------------

ProductMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  // userName: PropTypes.string
}

export default function ProductMoreMenu({ id, onDelete, deleteModalOpen, setDeleteModalOpen, handleClickOpen, handleClose,}) {
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
        //   onClick={() => {
        //     handleUpdateOrder(id, 'Processing')
        //     setIsOpen(false)
        //   }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <DirectionsRunOutlinedIcon />
            {/* <Icon icon={editFill} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          onClick={handleClickOpen}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <CancelOutlinedIcon />
            {/* <Icon icon={CancelOutlinedIcon} width={24} height={24} /> */}
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>

      <DeleteModal open={deleteModalOpen} onClose={handleClose} onDelete={onDelete} id={id}/>
    </>
  )
}
