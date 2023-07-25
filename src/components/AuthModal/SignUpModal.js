
import PropTypes from "prop-types";
import { DialogAnimate } from "../animate";
import SignUpForm from "../Auth/SignUpForm";

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
      <SignUpForm onClose={onClose}/>
    </DialogAnimate>
  );
}
