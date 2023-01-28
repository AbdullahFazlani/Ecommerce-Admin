import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
// import MenuButton from "../../ui-components/MenuButton";
// import URL from "../../utils/url";
// import routes from "../../config/routes";
// import { getAuth, removeAuth } from "../../helpers/auth";
import "./style.css";
import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { CloseFullscreen } from "@mui/icons-material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ViewListIcon from "@mui/icons-material/ViewList";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import BorderColorIcon from "@mui/icons-material/BorderColor";
const classNames = require("classnames");

const Header = ({
  toggleMenu,
  showHeader,
  showMenuTitle,
  setShowMenuTitle,
}) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  // const auth = getAuth();

  const navigateToLink = (url) => {
    navigate(url);
  };

  // eslint-disable-next-line no-unused-vars
  const openLink = (link) => {
    window.location.href = link;
  };

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    // removeAuth();
    window.location.href = new URL("/auth/login").getUrl();
  };

  return (
    <div
      className={classNames("h-screen fixed menu_con smooth-transition", {
        "menu-backdrop-show": showHeader,
        "menu-backdrop-hide": !showHeader,
      })}
    >
      <div className="backdrop" onClick={toggleMenu}>
        &nbsp;
      </div>
      <div
        className={classNames(
          "w-full h-screen fixed z-10 smooth-transition",
          {
            "header-show": showHeader,
            "header-hide": !showHeader,
          },
          { "header-wr": !showMenuTitle, "header-lw": showMenuTitle }
        )}
      >
        <div className="flex items-center	justify-center pt-5 pb-3 smooth-transition header-logo-wrapper">
          {/* <img
            src="/assets/img/logo.png"
            alt="Logo"
            // width="100px"
            className={`smooth-transition ${classNames({
              "w-24": showMenuTitle,
              "w-20": !showMenuTitle,
            })}`}
            onClick={() => navigateToLink("/")}
          /> */}
          <LogoDevIcon
            color="white"
            sx={{ color: "white", fontSize: "80px" }}
          />
        </div>
        <div className="py-6 menu_con z-10 smooth-transition h-full overflow-y-auto scrollbar-hide pb-52">
          <nav className="smooth-transition">
            {/* {auth?.user?.status === "APPROVED" ? (
              <MenuButton
                label={showMenuTitle ? `${t("mainMenu.dashboard")}` : ""}
                type="button"
                normal={window.location.pathname !== routes.dashboard}
                href={routes.dashboard}
                width="100%"
                height="56px"
                icon="dashboard"
                relativeImgPath="/assets/icons/menu-icons/"
                onClick={() => navigateToLink(routes.dashboard)}
                extraClasses={`smooth-transition overflow-hidden ${
                  !showMenuTitle ? "flex justify-center" : ""
                }`}
              />
            ) : null}
            {auth?.user?.status === "APPROVED" ? (
              <MenuButton
                label={showMenuTitle ? `${t("mainMenu.jobs")}` : ""}
                type="button"
                normal={window.location.pathname !== routes.jobs}
                href={routes.jobs}
                width="100%"
                height="56px"
                icon="dashboard"
                relativeImgPath="/assets/icons/menu-icons/"
                onClick={() => navigateToLink(routes.jobs)}
                extraClasses={`smooth-transition overflow-hidden ${
                  !showMenuTitle ? "flex justify-center" : ""
                }`}
              />
            ) : null}
            {auth?.user?.status === "APPROVED" ? (
              <MenuButton
                label={showMenuTitle ? `${t("mainMenu.categories")}` : ""}
                type="button"
                normal={window.location.pathname !== routes.categories}
                href={routes.categories}
                width="100%"
                height="56px"
                icon="dashboard"
                relativeImgPath="/assets/icons/menu-icons/"
                onClick={() => navigateToLink(routes.categories)}
                extraClasses={`smooth-transition overflow-hidden ${
                  !showMenuTitle ? "flex justify-center" : ""
                }`}
              />
            ) : null}
            {auth?.user?.status === "APPROVED" ? (
              <MenuButton
                label={showMenuTitle ? `${t("mainMenu.users")}` : ""}
                type="button"
                normal={window.location.pathname !== routes.users}
                href={routes.users}
                width="100%"
                height="56px"
                icon="dashboard"
                relativeImgPath="/assets/icons/menu-icons/"
                onClick={() => navigateToLink(routes.users)}
                extraClasses={`smooth-transition overflow-hidden ${
                  !showMenuTitle ? "flex justify-center" : ""
                }`}
              />
            ) : null}
            {auth?.user?.status === "APPROVED" &&
            auth?.user?.role === "SUPER_ADMIN" ? (
              <MenuButton
                label={showMenuTitle ? `${t("mainMenu.admins")}` : ""}
                type="button"
                normal={window.location.pathname !== routes.admins}
                href={routes.admins}
                width="100%"
                height="56px"
                icon="dashboard"
                relativeImgPath="/assets/icons/menu-icons/"
                onClick={() => navigateToLink(routes.admins)}
                extraClasses={`smooth-transition overflow-hidden ${
                  !showMenuTitle ? "flex justify-center" : ""
                }`}
              />
            ) : null}
            <MenuButton
              label={showMenuTitle ? `${t("mainMenu.profile")}` : ""}
              type="button"
              normal={window.location.pathname !== routes.profile}
              href={routes.profile}
              width="100%"
              height="56px"
              icon="dashboard"
              relativeImgPath="/assets/icons/menu-icons/"
              onClick={() => navigateToLink(routes.profile)}
              extraClasses={`smooth-transition overflow-hidden ${
                !showMenuTitle ? "flex justify-center" : ""
              }`}
            />
            <MenuButton
              label={showMenuTitle ? `${t("mainMenu.logOut")}` : ""}
              type="button"
              normal={true}
              href="#"
              width="100%"
              height="56px"
              icon="log-out"
              relativeImgPath="/assets/icons/menu-icons/"
              onClick={handleLogout}
              extraClasses={`smooth-transition overflow-hidden ${
                !showMenuTitle && "flex justify-center"
              }`}
            /> */}
            <Button
              sx={{
                width: "100%",
                height: "56px",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
                  color: "black",
                },
              }}
              //
              startIcon={<DashboardIcon />}
            >
              {showMenuTitle ? "Dashboard" : ""}
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "56px",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
                  color: "black",
                },
              }}
              startIcon={<InventoryIcon />}
            >
              {showMenuTitle ? "Products" : ""}
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "56px",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
                  color: "black",
                },
              }}
              startIcon={<CategoryIcon />}
            >
              {showMenuTitle ? "Category" : ""}
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "56px",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
                  color: "black",
                },
              }}
              startIcon={<BorderColorIcon />}
            >
              {showMenuTitle ? "Colors" : ""}
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "56px",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
                  color: "black",
                },
              }}
              startIcon={<ViewListIcon />}
            >
              {showMenuTitle ? "Orders" : ""}
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "56px",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(134.47deg, #FFFFFF -26.79%, #D0BEC0 230.75%)",
                  color: "black",
                },
              }}
              startIcon={<LogoutIcon />}
            >
              {showMenuTitle ? "logout" : ""}
            </Button>
          </nav>
        </div>
        {window.innerWidth > 768 ? (
          <button
            type="button"
            className="absolute bottom-0 bg-theme-minimize h-12 w-full flex flex-row items-center justify-center gap-3 px-5 py-3"
            onClick={() => setShowMenuTitle(!showMenuTitle)}
          >
            <div
              className={`smooth-transition ${
                showMenuTitle ? "no-rotate" : "rotate-around"
              }`}
            >
              {/* <img
                src="/assets/icons/minimize-icon.svg"
                alt="minimize"
                className={`smooth-transition ${
                  showMenuTitle ? "no-rotate" : "rotate-around"
                }`}
                // width="9%"
              /> */}
              <CloseFullscreen />
            </div>
            {showMenuTitle && <div className="text-black">Minimize</div>}
          </button>
        ) : null}
      </div>
    </div>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func,
  showHeader: PropTypes.bool,
  showMenuTitle: PropTypes.bool,
  setShowMenuTitle: PropTypes.func,
};

Header.defaultProps = {
  toggleMenu: undefined,
  showHeader: false,
  showMenuTitle: false,
  setShowMenuTitle: () => {},
};

export default Header;
