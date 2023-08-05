import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AllCategoriesData, DeleteCategoryData } from "../../Api/CategoryApi";
import Table from "../../Components/Table";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import EditCategory from "../../Features/EditCategory";
import { AllBrandsData, DeleteBrandData } from "../../Api/BrandApi";
import EditBrand from "../../Features/EditBrand";

const Brand = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [brandList, setBrandList] = useState([]);
  const {
    isLoading: brandListIsLoading,
    isError: brandListIsError,
    data: brandListData,
    error: brandListError,
    refetch: fetchBrandList,
  } = AllBrandsData();

  const {
    mutate: DeleteBrandMutate,
    isLoading: DeleteBrandIsLoading,
    isError: DeleteBrandIsError,
    data: DeleteBrandRes,
    error: DeleteBrandErr,
  } = DeleteBrandData();

  useEffect(() => {
    fetchBrandList();
  }, []);

  useEffect(() => {
    if (DeleteBrandRes) {
      Swal.fire({
        title: "Success",
        text: "Category Deleted Successfully!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        fetchBrandList();
      });
    }
  }, [
    DeleteBrandIsLoading,
    DeleteBrandIsError,
    DeleteBrandRes,
    DeleteBrandErr,
  ]);

  useEffect(() => {
    if (brandListData) {
      setBrandList(brandListData?.data);
    }
  }, [brandListIsLoading, brandListIsError, brandListData, brandListError]);
  const deleteBrand = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(() => {
      DeleteBrandMutate(id);
    });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Brand Name",
        accessor: "title",
        Cell: ({ row }) => (
          <p className="whitespace-nowrap text-theme-steel text-sm font-semibold">
            {row?.original?.title || "N/A"}
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
            <IconButton onClick={() => deleteBrand(row.original._id)}>
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
  const renderRowSubComponent = React.useCallback(
    ({ row }) => <EditBrand row={row} refetch={fetchBrandList} />,
    [fetchBrandList]
  );

  return (
    <Box sx={{ p: 10 }}>
      <Box display="flex" justifyContent="space-between" py={2}>
        <Typography variant="h4">Brands</Typography>
        <Box>
          <Button
            sx={{
              width: "200px",
              height: "56px",
              backgroundColor: "#5e17eb",
              color: "white",
              mr: 2,
            }}
            onClick={() => navigate("/add-brand")}
          >
            Add Brand
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
          data={brandList || []}
          tableInitials={tableInitials}
          isLoading={brandListIsLoading || false}
          renderRowSubComponent={renderRowSubComponent}
          searchValue={search}
        />
      </div>
    </Box>
  );
};

export default Brand;
