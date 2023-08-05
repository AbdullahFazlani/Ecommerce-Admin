import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Table from "../../Components/Table";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { AllProductsData, DeleteProductData } from "../../Api/ProductApi";

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const {
    isLoading: productListIsLoading,
    isError: productListIsError,
    data: productListData,
    error: productListError,
    refetch: fetchProductList,
  } = AllProductsData();

  const {
    mutate: DeleteProductMutate,
    isLoading: DeleteProductIsLoading,
    isError: DeleteProductIsError,
    data: DeleteProductRes,
    error: DeleteProductErr,
  } = DeleteProductData();

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    if (DeleteProductRes) {
      Swal.fire({
        title: "Success",
        text: "Product Deleted Successfully!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        fetchProductList();
      });
    }
  }, [
    DeleteProductIsLoading,
    DeleteProductIsError,
    DeleteProductRes,
    DeleteProductErr,
  ]);

  useEffect(() => {
    if (productListData) {
      setProductList(productListData?.data);
    }
  }, [
    productListIsLoading,
    productListIsError,
    productListData,
    productListError,
  ]);
  const deleteProduct = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteProductMutate(id);
      }
    });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "title",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.title || "N/A"}
          </p>
        ),
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.price || "N/A"}
          </p>
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.category || "N/A"}
          </p>
        ),
      },
      {
        Header: "Brand",
        accessor: "brand",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.brand || "N/A"}
          </p>
        ),
      },
      {
        Header: "Colors",
        accessor: "color",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.color.map((item) => (
              <div>
                {" "}
                {item.colorName} --&gt;{" "}
                {item.inStock ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of stock</span>
                )}
              </div>
            )) || "N/A"}
          </p>
        ),
      },
      {
        Header: `Created At`,
        accessor: "createdAt",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.createdAt || "N/A"}
          </p>
        ),
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.updatedAt || "N/A"}
          </p>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <Box display="flex" gap={2}>
            <IconButton>
              <BorderColorIcon {...row.getToggleRowExpandedProps()} />
            </IconButton>
            <IconButton onClick={() => deleteProduct(row.original._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    // [deleteCategory, categoryListData]
    []
  );
  const tableInitials = {
    pageIndex: 0,
  };
  // const renderRowSubComponent = React.useCallback(
  //   ({ row }) => <EditColor row={row} refetch={fetchColorList} />,
  //   [fetchColorList]
  // );

  return (
    <Box sx={{ m: 10 }}>
      <Box display="flex" justifyContent="space-between" py={2}>
        <Typography variant="h4">Products</Typography>
        <Box>
          <Button
            sx={{
              width: "200px",
              height: "56px",
              backgroundColor: "#5e17eb",
              color: "white",
              mr: 2,
            }}
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </Button>
          <TextField
            id="search"
            name="search"
            sx={{ width: "200px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
      <div className="bg-white overflow-auto rounded-lg shadow-2xl custom-hori-slim-scroll-bar-class">
        <Table
          columns={columns}
          data={productList || []}
          tableInitials={tableInitials}
          isLoading={productListIsLoading || false}
          // renderRowSubComponent={renderRowSubComponent}
          searchValue={search}
        />
      </div>
    </Box>
  );
};

export default Products;
