import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;
const Api = axios.create({
  baseURL: BASE_URL,
});

// Api.interceptors.request.use(function (config) {
//   // LoaderManager.show();
//   if (localStorage.getItem("token") !== null) {
//     config.headers.common["Authorization"] = `${localStorage.getItem("token")}`;
//   }

//   config.headers.common["Content-Type"] = "application/json";

//   return config;
// });

// Api.interceptors.response.use(
//   (response) => {
//     // LoaderManager.hide();
//     return response;
//   },
//   function (error) {
//     // LoaderManager.hide();
//     if (error.response && error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = "/";
//     }
//     return Promise.reject(error.response);
//   }
// );
Api.interceptors.request.use(
  (config) => {
    // Set the authorization header for all API requests
    if (localStorage.getItem("token") !== null) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);
export default Api;
