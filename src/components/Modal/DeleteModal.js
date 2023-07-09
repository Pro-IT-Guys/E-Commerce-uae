import PropTypes from 'prop-types'
// material
import { DialogTitle } from '@mui/material'
import { DialogAnimate } from '../animate'

// ----------------------------------------------------------------------

DeleteModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
}

export default function DeleteModal({ open, onClose, onDelete, id }) {
  return (
    <DialogAnimate maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle className="  text-center ">
        Are you sure, You want to Delete this Product?
      </DialogTitle>
      <div className='pt-5 flex justify-center gap-2 md:pb-10 pb-5 '>
        <button 
        onClick={() => onDelete(id)}
        className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2 px-4 rounded-full">
          Delete
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-sm text-white font-bold py-2 px-4 rounded-full">
          Cancel
        </button>
      </div>
    </DialogAnimate>
  )
}
