// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Routes";

function App() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const token = localStorage.getItem("token");
  // console.log(token);
  // const LoggedIn = token ? true : false;
  // if (LoggedIn && token && window.location.pathname === "/") {
  //   navigate("/home");
  // } else if (!LoggedIn && window.location.pathname === "/") {
  //   navigate("/login");
  // }

  return (
    <BrowserRouter basename="/">
      <Routing />
    </BrowserRouter>
  );
}

export default App;
