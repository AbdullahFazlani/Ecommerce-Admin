import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { PostProductData } from "../../Api/ProductApi";
import { AllCategoriesData } from "../../Api/CategoryApi";
import { AllBrandsData } from "../../Api/BrandApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    mutate: productMutate,
    isLoading: postProductIsLoading,
    isError: postProductIsError,
    data: postProductRes,
    error: postProductErr,
  } = PostProductData();

  const {
    isLoading: categoryListIsLoading,
    isError: categoryListIsError,
    data: categoryListData,
    error: categoryListError,
    refetch: fetchCategoryList,
  } = AllCategoriesData();

  const {
    isLoading: brandListIsLoading,
    isError: brandListIsError,
    data: brandListData,
    error: brandListError,
    refetch: fetchBrandList,
  } = AllBrandsData();

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    fetchBrandList();
  }, []);

  useEffect(() => {
    if (categoryListData) {
      console.log("categoryListData", categoryListData?.data);
    }
  }, [
    categoryListIsLoading,
    categoryListIsError,
    categoryListData,
    categoryListError,
  ]);

  useEffect(() => {
    if (brandListData) {
      console.log(brandListData?.data);
    }
  }, [brandListIsLoading, brandListIsError, brandListData, brandListError]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: 0,
      color: [
        {
          colorName: "",
          inStock: true,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      brand: Yup.string().required("Required"),
      price: Yup.number().integer().min(1).required("Required"),
    }),
    onSubmit: (values) => {
      const productData = {
        title: values.title,
        description: values.description,
        category: values.category,
        brand: values.brand,
        price: values.price,
        color: values.color,
      };
      productMutate(productData);
    },
  });

  useEffect(() => {
    if (postProductRes) {
      Swal.fire({
        title: "Success",
        text: "Product Created Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        navigate(-1);
      });
    }
    if (postProductIsError) {
      if (postProductErr?.response?.data?.message.includes("token expired")) {
        Swal.fire({
          title: "Error",
          text: postProductErr?.response?.data?.message,
          icon: "error",
          confirmButtonText: "OK",
        }).then(function () {
          navigate("/login");
          console.log("error");
        });
      }
    }
    console.log("postProductRes", postProductRes);
    console.log("postProductErr", postProductErr?.response?.data?.message);
  }, [postProductRes, postProductIsError, postProductErr]);

  const addAnotherColor = () => {
    const color = [...formik.values.color];
    color.push({ colorName: "", inStock: true });
    formik.setValues({ ...formik.values, color });
  };

  //   console.log("color", formik.values.color);
  return (
    <Box p={10}>
      <Typography variant="h4">Add Product</Typography>
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
      <TextField
        type="text"
        id="description"
        value={formik.values.description}
        fullWidth
        multiline
        rows={2}
        autoComplete="off"
        onChange={formik.handleChange}
        margin="normal"
        required
        label="Description"
        name="description"
        error={formik.errors.description && formik.touched.description}
        helperText={
          formik.errors.description &&
          formik.touched.description &&
          formik.errors.description
        }
      />
      <TextField
        type="number"
        id="price"
        value={formik.values.price}
        fullWidth
        autoComplete="off"
        onChange={formik.handleChange}
        margin="normal"
        required
        label="Price"
        name="price"
        error={formik.errors.price && formik.touched.price}
        helperText={
          formik.errors.price && formik.touched.price && formik.errors.price
        }
      />
      <FormControl fullWidth sx={{ my: "16px" }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          id="category"
          value={formik.values.category}
          fullWidth
          autoComplete="off"
          onChange={formik.handleChange}
          margin="normal"
          required
          label="Category"
          name="category"
        >
          {categoryListData?.data?.map((item) => {
            return <MenuItem value={item?.title}>{item?.title}</MenuItem>;
          })}
        </Select>
        <FormHelperText>
          {formik.errors.category &&
            formik.touched.category &&
            formik.errors.category}
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth sx={{ my: "16px" }}>
        <InputLabel id="brand">Brand</InputLabel>
        <Select
          id="brand"
          value={formik.values.brand}
          fullWidth
          autoComplete="off"
          onChange={formik.handleChange}
          margin="normal"
          required
          label="Brand"
          name="brand"
          error={formik.errors.brand && formik.touched.brand}
          helperText={
            formik.errors.brand && formik.touched.brand && formik.errors.brand
          }
        >
          {brandListData?.data?.map((item) => {
            return <MenuItem value={item?.title}>{item?.title}</MenuItem>;
          })}
        </Select>
        <FormHelperText>
          {formik.errors.brand && formik.touched.brand && formik.errors.brand}
        </FormHelperText>
      </FormControl>
      {/* <FieldArray
        name="color"
        render={() =>
          formik.values.color.length > 0 &&
          formik.values.color.map((item, index) => {
            <Box display="flex">
              <TextField
                type="text"
                id={`color[${index}].colorName`}
                name={`color[${index}].colorName`}
                sx={{ width: "80%" }}
                value={formik.values.color[index].colorName}
                autoComplete="off"
                onChange={formik.handleChange}
                margin="normal"
                required
                label="Color Name"
                error={
                  formik.errors.color[index].colorName &&
                  formik.touched.color[index].colorName
                }
                helperText={
                  formik.errors.color[index].colorName &&
                  formik.touched.color[index].colorName &&
                  formik.errors.color[index].colorName
                }
              />
              <FormControlLabel
                control={<Switch defaultChecked color="success" size="large" />}
                label="In Stock"
                labelPlacement="start"
              />
            </Box>;
          })
        }
      /> */}
      {formik.values.color.length > 0 &&
        formik.values.color.map((item, index) => (
          <Box display="flex">
            <TextField
              type="text"
              id={`color[${index}].colorName`}
              name={`color[${index}].colorName`}
              sx={{ width: "80%" }}
              value={formik.values.color[index].colorName}
              autoComplete="off"
              onChange={formik.handleChange}
              margin="normal"
              required
              label="Color Name"
              //   error={
              //     formik.errors.color[index].colorName &&
              //     formik.touched.color[index].colorName
              //   }
              //   helperText={
              //     formik.errors.color[index].colorName &&
              //     formik.touched.color[index].colorName &&
              //     formik.errors.color[index].colorName
              //   }
            />
            <FormControlLabel
              control={
                <Switch
                  id={`color[${index}].inStock`}
                  name={`color[${index}].inStock`}
                  checked={formik.values.color[index].inStock}
                  onChange={(event) => {
                    console.log(event.target.checked);
                    formik.setFieldValue(
                      `color[${index}].inStock`,
                      event.target.checked
                    );
                  }}
                  color="success"
                  size="large"
                />
              }
              label="In Stock"
              labelPlacement="start"
            />
          </Box>
        ))}

      <Box>
        <Button
          sx={{
            width: "100%",
            height: "40px",
            backgroundColor: "#5e17eb",
            color: "white",
            borderRadius: "10px",
            justifyItems: "flex-end",
            mt: 1,
            whiteSpace: "nowrap",
            fontSize: "small",
          }}
          onClick={addAnotherColor}
        >
          + Add Another Color
        </Button>
      </Box>
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
          {postProductIsLoading ? <CircularProgress /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
