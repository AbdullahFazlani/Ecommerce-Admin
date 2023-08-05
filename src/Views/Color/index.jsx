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
import { AllColorsData, DeleteColorData } from "../../Api/ColorApi";
import EditColor from "../../Features/EditColor";

const Color = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [colorList, setColorList] = useState([]);
  const {
    isLoading: colorListIsLoading,
    isError: colorListIsError,
    data: colorListData,
    error: colorListError,
    refetch: fetchColorList,
  } = AllColorsData();

  const {
    mutate: DeleteColorMutate,
    isLoading: DeleteColorIsLoading,
    isError: DeleteColorIsError,
    data: DeleteColorRes,
    error: DeleteColorErr,
  } = DeleteColorData();

  useEffect(() => {
    fetchColorList();
  }, []);

  useEffect(() => {
    if (DeleteColorRes) {
      Swal.fire({
        title: "Success",
        text: "Category Deleted Successfully!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        fetchColorList();
      });
    }
  }, [
    DeleteColorIsLoading,
    DeleteColorIsError,
    DeleteColorRes,
    DeleteColorErr,
  ]);

  useEffect(() => {
    if (colorListData) {
      setColorList(colorListData?.data);
    }
  }, [colorListIsLoading, colorListIsError, colorListData, colorListError]);
  const deleteColor = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteColorMutate(id);
      }
    });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Color Name",
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
            <IconButton onClick={() => deleteColor(row.original._id)}>
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
    ({ row }) => <EditColor row={row} refetch={fetchColorList} />,
    [fetchColorList]
  );

  return (
    <Box sx={{ p: 10 }}>
      <Box display="flex" justifyContent="space-between" py={2}>
        <Typography variant="h4">Colors</Typography>
        <Box>
          <Button
            sx={{
              width: "200px",
              height: "56px",
              backgroundColor: "#5e17eb",
              color: "white",
              mr: 2,
            }}
            onClick={() => navigate("/add-color")}
          >
            Add Color
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
      <Table
        columns={columns}
        data={colorList || []}
        tableInitials={tableInitials}
        isLoading={colorListIsLoading || false}
        renderRowSubComponent={renderRowSubComponent}
        searchValue={search}
      />
    </Box>
  );
};

export default Color;
