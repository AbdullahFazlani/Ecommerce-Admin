import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "../Components/RequireAuth";
import HomeRoute from "./Home";
import LoginRoute from "./login";

const Routing = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<HomeRoute />} />
        </Route>
        <Route path="/login" element={<LoginRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
