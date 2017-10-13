import React, { Component } from "react";
import { css } from "glamor";
import { NavLink } from "react-router-dom";
import { theme, headerHeight } from "../../Styles/Theme";
import IconSVG from "../IconSVG";

const navBarStyles = css({
  height: `${headerHeight}px`,
  backgroundColor: theme.main.colors.tollerantPink,
  position: "fixed",
  width: "100%",
  zIndex: "2000",
  top: "0",
  justifyContent: "center",
  "& .navbar-nav": {
    flexDirection: "row",
    "& .nav-item": {
      padding: "0 20px",
      fontSize: "1.5em",
      ":hover": {
        color: "white"
      },
      "& .nav-link": {
        color: "inherit",
        ".active": {
          color: `black`
        }
      }
    }
  }
});
const greyFontColor = css({
  color: theme.main.colors.gray
});

export default class Header extends Component {
  render() {
    return (
      <nav className={`navbar ${navBarStyles}`}>
        <ul className={`navbar-nav ${greyFontColor}`}>
          <li className={`nav-item`}>
            <NavLink
              className="nav-link"
              to="/journals"
              isActive={(match, location) => {
                return match || location.pathname === "/";
              }}
            >
              <IconSVG name="icon-home" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/projects">
              <IconSVG name="icon-github" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/albums">
              <IconSVG name="icon-camera" />
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
