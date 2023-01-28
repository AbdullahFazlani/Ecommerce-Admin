import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeRoute from "./Home";
import LoginRoute from "./login";

const Routing = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/home" element={<HomeRoute />} />
        <Route path="/login" element={<LoginRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
