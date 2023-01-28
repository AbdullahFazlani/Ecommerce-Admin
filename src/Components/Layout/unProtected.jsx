import React, { Suspense } from "react";
import PropTypes from "prop-types";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./style.css";
import FullPageLoader from "../../components/Loader/fullPageLoader";

const classNames = require("classnames");

const LayoutAuth = ({ children }) => {
  const { height } = useWindowDimensions();

  return (
    <div className="w-full flex" style={{ height }}>
      <Suspense fallback={<FullPageLoader />}>
        <div
          className={classNames(
            "h-screen overflow-auto w-full z-0 smooth-transition"
          )}
        >
          {children}
        </div>
      </Suspense>
    </div>
  );
};

LayoutAuth.propTypes = {
  children: PropTypes.element,
};

LayoutAuth.defaultProps = {
  children: undefined,
};

export default LayoutAuth;
