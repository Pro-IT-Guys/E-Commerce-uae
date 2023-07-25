
import PropTypes from "prop-types";
// material
import {
  DialogTitle,
} from "@mui/material";
import { DialogAnimate } from "../animate";
import LoginForm from "../Auth/LoginForm";

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
      <DialogTitle className=" bg-[#f1fff4] text-center">Login Now</DialogTitle>
      <LoginForm   onClose={onClose}/>
    </DialogAnimate>
  );
}
