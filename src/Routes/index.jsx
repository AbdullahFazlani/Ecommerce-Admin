import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RequireAuth from "../Components/RequireAuth";
import AddCategoriesRoute from "./AddCategory";
import CategoriesRoute from "./Categories";
import HomeRoute from "./Home";
import LoginRoute from "./login";
import BrandRoute from "./Brand";
import AddBrandRoute from "./AddBrand";
import ColorRoute from "./Color";
import AddColorRoute from "./AddColor";
import ProductsRoute from "./Products";
import AddProductRoute from "./AddProduct";

const Routing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (window.location.pathname === "/" && !token) {
  //     navigate("/login");
  //   }
  //   if (window.location.pathname === "/" && token) {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<HomeRoute />} />
        <Route path="/categories" element={<CategoriesRoute />} />
        <Route path="/add-category" element={<AddCategoriesRoute />} />
        <Route path="/brand" element={<BrandRoute />} />
        <Route path="/add-brand" element={<AddBrandRoute />} />
        <Route path="/color" element={<ColorRoute />} />
        <Route path="/add-color" element={<AddColorRoute />} />
        <Route path="/products" element={<ProductsRoute />} />
        <Route path="/add-product" element={<AddProductRoute />} />
      </Route>
      <Route path="/login" element={<LoginRoute />} />
    </Routes>
  );
};

export default Routing;
