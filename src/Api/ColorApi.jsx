import { useMutation, useQuery } from "react-query";
import Api from "./Api";

const GetAllColors = async () => {
  return Api.get("/api/color");
};

export const AllColorsData = () => {
  return useQuery("All Colors", GetAllColors, {
    enabled: false,
  });
};

const AddColor = async (user) => {
  return Api.post("/api/color", user);
};

export const PostColorData = () => {
  return useMutation(AddColor, {});
};

const DeleteColor = async (id) => {
  return Api.delete(`/api/color/${id}`);
};

export const DeleteColorData = () => {
  return useMutation(DeleteColor, {});
};

const UpdateColor = async ({ updatedId, colorData }) => {
  return Api.put(`/api/color/${updatedId}`, colorData);
};

export const UpdateColorData = () => {
  return useMutation(UpdateColor, {});
};
