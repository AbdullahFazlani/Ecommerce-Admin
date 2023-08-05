import { useMutation, useQuery } from "react-query";
import Api from "./Api";

const GetAllBrands = async () => {
  return Api.get("/brand");
};

export const AllBrandsData = () => {
  return useQuery("All Brands", GetAllBrands, {
    enabled: false,
  });
};

const AddBrand = async (user) => {
  return Api.post("/brand", user);
};

export const PostBrandData = () => {
  return useMutation(AddBrand, {});
};

const DeleteBrand = async (id) => {
  return Api.delete(`/brand/${id}`);
};

export const DeleteBrandData = () => {
  return useMutation(DeleteBrand, {});
};

const UpdateBrand = async ({ updatedId, brandData }) => {
  return Api.put(`/brand/${updatedId}`, brandData);
};

export const UpdateBrandData = () => {
  return useMutation(UpdateBrand, {});
};
