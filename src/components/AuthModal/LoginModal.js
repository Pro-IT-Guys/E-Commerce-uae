
import PropTypes from "prop-types";
// material
import {
  DialogTitle,
} from "@mui/material";
import { DialogAnimate } from "../animate";
import LoginForm from "../Auth/LoginForm";
import CancelIcon from '@mui/icons-material/Cancel';

// ----------------------------------------------------------------------

LoginFormModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function LoginFormModal({ open, onClose }) {

  return (
    <DialogAnimate maxWidth="sm" open={open} onClose={onClose} >

      <div
        onClick={onClose}
        className="flex justify-end py-3 pr-4 cursor-pointer text-secondary">
        <CancelIcon fontSize="large"/>
      </div>
      <LoginForm onClose={onClose} />
    </DialogAnimate>
  );
}
