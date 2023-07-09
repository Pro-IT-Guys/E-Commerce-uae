import * as Yup from "yup";
import PropTypes from "prop-types";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  Radio,
  Button,
  Divider,
  Checkbox,
  TextField,
  RadioGroup,
  DialogTitle,
  DialogActions,
  FormControlLabel,
} from "@mui/material";
import { DialogAnimate } from "../animate";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
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
