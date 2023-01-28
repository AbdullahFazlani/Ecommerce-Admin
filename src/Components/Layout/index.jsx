import React, { useState, useEffect, Suspense } from "react";
import PropTypes from "prop-types";
// import useWindowDimensions from "../../hooks/useWindowDimensions";
import { ToggleMenuContextProvider } from "./toggleMenuContext";
// import FullPageLoader from "../../components/Loader/fullPageLoader";
import Header from "../Header";
import "./style.css";

const classNames = require("classnames");

function Layout({ children, showMenuTitleRedux }) {
  // eslint-disable-next-line no-unused-vars
  // const { height } = useWindowDimensions();
  const [showHeader, setShowHeader] = useState(false);
  const [showMenuTitle, setShowMenuTitle] = useState(showMenuTitleRedux);
  const toggleMenu = (e) => {
    e.preventDefault();
    setShowHeader(!showHeader);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowHeader(true);
    }
  }, []);

  return (
    // <div className="w-full flex" style={{ height }}>
    <div className="w-full flex h-full">
      <Header
        toggleMenu={toggleMenu}
        showHeader={showHeader}
        showMenuTitle={showMenuTitle}
        setShowMenuTitle={setShowMenuTitle}
      />
      {/* <Suspense fallback={<FullPageLoader />}> */}
      <Suspense >
        <div
          className={classNames(
            "h-screen overflow-auto w-full z-0 smooth-transition bg-theme-background-form",
            {
              "content-con": showMenuTitle,
              "content-con-min": !showMenuTitle,
            }
          )}
        >
          <ToggleMenuContextProvider
            value={{
              toggleMenu,
            }}
          >
            {children}
          </ToggleMenuContextProvider>
        </div>
      </Suspense>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
  showMenuTitleRedux: PropTypes.bool,
};

Layout.defaultProps = {
  children: undefined,
  showMenuTitleRedux: true,
};

export default Layout;
