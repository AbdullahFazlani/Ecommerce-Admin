import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UpdateCategoryData } from "../../Api/CategoryApi";
import Swal from "sweetalert2";
import { UpdateBrandData } from "../../Api/BrandApi";

const EditBrand = ({ row, refetch }) => {
  const [updatedId, setUpdatedId] = useState();
  const {
    mutateAsync: updateBrandMutate,
    isLoading: updateBrandIsLoading,
    isError: updateBrandIsError,
    data: updateBrandRes,
    error: updateBrandErr,
  } = UpdateBrandData();

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
      updateBrandMutate({ updatedId, brandData });
      console.log(brandData);
    },
  });

  useEffect(() => {
    if (row.original.title) {
      formik.setFieldValue("title", row.original.title);
    }
  }, [row.original.title]);

  useEffect(() => {
    if (updateBrandRes) {
      Swal.fire({
        title: "Success",
        text: "Category Updated Successfully!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        refetch();
      });
    }
  }, [
    updateBrandIsLoading,
    updateBrandIsError,
    updateBrandRes,
    updateBrandErr,
  ]);

  useEffect(() => {
    setUpdatedId(row.original._id);
  }, [row]);

  return (
    <Box p={2}>
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
          {updateBrandIsLoading ? <CircularProgress /> : "Update"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditBrand;
