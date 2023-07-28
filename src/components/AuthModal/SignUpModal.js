
import PropTypes from "prop-types";
import { DialogAnimate } from "../animate";
import SignUpForm from "../Auth/SignUpForm";
import CancelIcon from '@mui/icons-material/Cancel';

// ----------------------------------------------------------------------

SignUpModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function SignUpModal({ open, onClose }) {
  return (
    <DialogAnimate maxWidth="sm" open={open} onClose={onClose} >
      <div
        onClick={onClose}
        className="flex justify-end py-3 pr-4 cursor-pointer text-secondary">
        <CancelIcon fontSize="large"/>
      </div>
      <SignUpForm onClose={onClose}/>
    </DialogAnimate>
  );
}
