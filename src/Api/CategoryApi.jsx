import { useMutation, useQuery } from "react-query";
import Api from "./Api";

const GetAllCategories = async () => {
  return Api.get("/category");
};

export const AllCategoriesData = () => {
  return useQuery("All categories", GetAllCategories, {
    enabled: false,
  });
};

const AddCategory = async (user) => {
  return Api.post("/category", user);
};

export const PostCategoryData = () => {
  return useMutation(AddCategory, {});
};
const DeleteCategory = async (id) => {
  return Api.delete(`/category/${id}`);
};

export const DeleteCategoryData = () => {
  return useMutation(DeleteCategory, {});
};
const UpdateCategory = async ({ updatedId, categoryData }) => {
  console.log("in api", updatedId, categoryData);
  return Api.put(`/category/${updatedId}`, categoryData);
};

export const UpdateCategoryData = () => {
  return useMutation(UpdateCategory, {});
};
