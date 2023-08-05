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
import { PostBrandData } from "../../Api/BrandApi";

const AddBrand = () => {
  const navigate = useNavigate();

  const {
    mutate: brandMutate,
    isLoading: postBrandIsLoading,
    isError: postBrandIsError,
    data: postBrandRes,
    error: postBrandErr,
  } = PostBrandData();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const brandData = {
        title: values.title,
      };
      brandMutate(brandData);
      console.log(brandData);
    },
  });

  useEffect(() => {
    console.log("postBrandRes", postBrandRes);
    console.log("postBrandErr", postBrandErr);
    if (postBrandRes) {
      Swal.fire({
        title: "Success",
        text: "Category Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        navigate(-1);
      });
    }

    if (postBrandIsError) {
      if (postBrandErr?.response?.status === 401) {
        Swal.fire({
          title: "Error",
          text: postBrandErr?.response?.data?.message,
          icon: "error",
          confirmButtonText: "OK",
        }).then(function () {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: postBrandErr,
          icon: "error",
          confirmButtonText: "OK",
        }).then(function () {
          console.log("error");
        });
      }
    }
  }, [postBrandRes, postBrandIsError, postBrandErr]);

  return (
    <Box p={10}>
      <Typography variant="h4">Add Brand</Typography>
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
          {postBrandIsLoading ? <CircularProgress /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddBrand;
