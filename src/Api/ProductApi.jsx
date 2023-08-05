import { useMutation, useQuery } from "react-query";
import Api from "./Api";

const GetAllProducts = async () => {
  return Api.get("/product");
};

export const AllProductsData = () => {
  return useQuery("All product", GetAllProducts, {
    enabled: false,
  });
};

const AddProduct = async (user) => {
  return Api.post("/product", user);
};

export const PostProductData = () => {
  return useMutation(AddProduct, {});
};
const DeleteProduct = async (id) => {
  return Api.delete(`/product/${id}`);
};

export const DeleteProductData = () => {
  return useMutation(DeleteProduct, {});
};
const UpdateProduct = async ({ updatedId, ProductData }) => {
  console.log("in api", updatedId, ProductData);
  return Api.put(`/product/${updatedId}`, ProductData);
};

export const UpdateProductData = () => {
  return useMutation(UpdateProduct, {});
};
