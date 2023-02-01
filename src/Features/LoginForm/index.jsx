import React, { useEffect, useState } from "react";
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
import { PostLoginData } from "../../Api/LoginApi";
import Api from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isProgress, setIsProgress] = useState(false);
  const navigate = useNavigate();

  const {
    mutate: loginMutate,
    isLoading: postLoginIsLoading,
    isError: postLoginIsError,
    data: postLoginRes,
    error: postLoginErr,
  } = PostLoginData();

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
      loginMutate(loginData);
      console.log(loginData);
    },
  });

  useEffect(() => {
    if (postLoginRes) {
      Swal.fire({
        title: "Success",
        text: "Logged In Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        console.log("postLoginRes", postLoginRes.data.token);
        localStorage.setItem("token", postLoginRes.data.token);
        navigate("/home");
      });
    }
    if (postLoginIsError) {
      Swal.fire({
        title: "Error",
        text: postLoginErr,
        icon: "error",
        confirmButtonText: "OK",
      }).then(function () {
        console.log("error");
      });
    }
  }, [postLoginRes, postLoginIsError, postLoginErr]);

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
        {postLoginIsLoading ? <CircularProgress /> : "LOG IN"}
      </Button>
    </Box>
  );
};

export default LoginForm;
