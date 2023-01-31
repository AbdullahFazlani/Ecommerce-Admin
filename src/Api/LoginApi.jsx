// import axios from "axios";
import { useMutation } from "react-query";
import Api from "./Api";

const AddLogin = async (user) => {
  return Api.post("/login", user);
};

export const PostLoginData = () => {
  return useMutation(AddLogin, {
    // onSuccess:(data)=>console.log('response data',data)
  });
};
