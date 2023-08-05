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

const Categories = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {
    isLoading: categoryListIsLoading,
    isError: categoryListIsError,
    data: categoryListData,
    error: categoryListError,
    refetch: fetchCategoryList,
  } = AllCategoriesData();

  const {
    mutate: DeleteCategoryMutate,
    isLoading: DeleteCategoryIsLoading,
    isError: DeleteCategoryIsError,
    data: DeleteCategoryRes,
    error: DeleteCategoryErr,
  } = DeleteCategoryData();

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    if (DeleteCategoryRes) {
      Swal.fire({
        title: "Success",
        text: "Category Deleted Successfully!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        fetchCategoryList();
      });
    }
  }, [
    DeleteCategoryIsLoading,
    DeleteCategoryIsError,
    DeleteCategoryRes,
    DeleteCategoryErr,
  ]);

  useEffect(() => {
    if (categoryListData) {
      console.log("categoryListData", categoryListData);
    }
  }, [
    categoryListIsLoading,
    categoryListIsError,
    categoryListData,
    categoryListError,
  ]);
  const deleteCategory = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(() => {
      DeleteCategoryMutate(id);
    });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Category Name",
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
            <IconButton onClick={() => deleteCategory(row.original._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [deleteCategory, categoryListData]
  );
  const tableInitials = {
    pageIndex: 0,
  };
  const renderRowSubComponent = React.useCallback(
    ({ row }) => <EditCategory row={row} refetch={fetchCategoryList} />,
    [fetchCategoryList]
  );

  return (
    <Box sx={{ p: 10 }}>
      <Box display="flex" justifyContent="space-between" py={2}>
        <Typography variant="h4">Categories</Typography>
        <Box>
          <Button
            sx={{
              width: "200px",
              height: "56px",
              backgroundColor: "#5e17eb",
              color: "white",
              mr: 2,
            }}
            onClick={() => navigate("/add-category")}
          >
            Add Category
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
      {categoryListData?.data ? (
        <div className="bg-white overflow-auto rounded-lg shadow-2xl custom-hori-slim-scroll-bar-class">
          <Table
            columns={columns}
            data={categoryListData?.data || []}
            tableInitials={tableInitials}
            isLoading={categoryListIsLoading || false}
            renderRowSubComponent={renderRowSubComponent}
            searchValue={search}
          />
        </div>
      ) : null}
    </Box>
  );
};

export default Categories;
