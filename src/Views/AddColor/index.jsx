import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { PostColorData } from "../../Api/ColorApi";

const AddColor = () => {
  const navigate = useNavigate();

  const {
    mutate: colorMutate,
    isLoading: postColorIsLoading,
    isError: postColorIsError,
    data: postColorRes,
    error: postColorErr,
  } = PostColorData();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const colorData = {
        title: values.title,
      };
      colorMutate(colorData);
      console.log(colorData);
    },
  });

  useEffect(() => {
    if (postColorRes) {
      Swal.fire({
        title: "Success",
        text: "Category Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        navigate(-1);
      });
    }
    if (postColorIsError) {
      if (postColorErr?.response?.data?.message.includes("token expired")) {
        Swal.fire({
          title: "Error",
          text: postColorErr?.response?.data?.message,
          icon: "error",
          confirmButtonText: "OK",
        }).then(function () {
          navigate("/login");
          console.log("error");
        });
      }
    }
    console.log("postColorRes", postColorRes);
    console.log("postColorErr", postColorErr?.response?.data?.message);
  }, [postColorRes, postColorIsError, postColorErr]);

  return (
    <Box p={10}>
      <Typography variant="h4">Add Color</Typography>
      <TextField
        type="text"
        id="title"
        value={formik.values.title}
        fullWidth
        autoComplete="off"
        onChange={formik.handleChange}
        margin="normal"
        required
        label="Title"
        name="title"
        error={formik.errors.title && formik.touched.title}
        helperText={
          formik.errors.title && formik.touched.title && formik.errors.title
        }
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          sx={{
            width: "150px",
            height: "44px",
            backgroundColor: "#5e17eb",
            color: "white",
            borderRadius: "10px",
            justifyItems: "flex-end",
            mt: 1,
          }}
          onClick={formik.handleSubmit}
        >
          {postColorIsLoading ? <CircularProgress /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddColor;
