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
import SignUpForm from "../Auth/SignUpForm";

// ----------------------------------------------------------------------

SignUpModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
};

export default function SignUpModal({ open, onClose }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <DialogAnimate maxWidth="sm" open={open} onClose={onClose} >
      {/* <DialogTitle className="text-center">Signup Now</DialogTitle> */}
      <SignUpForm onClose={onClose}/>
    </DialogAnimate>
  );
}
