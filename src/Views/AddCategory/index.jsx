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
import { PostCategoryData } from "../../Api/CategoryApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddCategory = () => {
  const navigate = useNavigate();

  const {
    mutate: categoryMutate,
    isLoading: postCategoryIsLoading,
    isError: postCategoryIsError,
    data: postCategoryRes,
    error: postCategoryErr,
  } = PostCategoryData();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const categoryData = {
        title: values.title,
      };
      categoryMutate(categoryData);
      console.log(categoryData);
    },
  });
  useEffect(() => {
    if (postCategoryRes) {
      Swal.fire({
        title: "Success",
        text: "Category Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        navigate(-1);
      });
    }
    if (postCategoryIsError) {
      Swal.fire({
        title: "Error",
        text: postCategoryErr,
        icon: "error",
        confirmButtonText: "OK",
      }).then(function () {
        console.log("error");
      });
    }
  }, [postCategoryRes, postCategoryIsError, postCategoryErr]);

  return (
    <Box p={10}>
      <Typography variant="h4">Add Category</Typography>
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
          {postCategoryIsLoading ? <CircularProgress /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddCategory;
