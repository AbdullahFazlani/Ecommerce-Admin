import React, { useState } from "react";
import { EmailOutlined, Lock } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const LoginForm = () => {
  const [isProgress, setIsProgress] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email.").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const loginData = {
        email: values.email,
        password: values.password,
      };
      Swal.fire({
        title: "Success",
        text: "Logged In Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        console.log("success");
      });
      console.log(loginData);
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <TextField
        type="text"
        id="email"
        value={formik.values.email}
        fullWidth
        autoComplete="off"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="normal"
        required
        label="Email Address"
        name="email"
        error={formik.errors.email && formik.touched.email}
        helperText={
          formik.errors.email && formik.touched.email && formik.errors.email
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlined />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="password"
        id="password"
        value={formik.values.password}
        fullWidth
        autoComplete="off"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="normal"
        required
        label="Password"
        name="password"
        error={formik.errors.password && formik.touched.password}
        helperText={
          formik.errors.password &&
          formik.touched.password &&
          formik.errors.password
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        disabled={isProgress}
        fullWidth
        variant="contained"
        className="bg-theme"
        size="large"
        sx={{ mt: 3, backgroundColor: "#5e17eb" }}
      >
        {!isProgress && "LOG IN"}
        {isProgress && <CircularProgress />}
      </Button>
    </Box>
  );
};

export default LoginForm;
