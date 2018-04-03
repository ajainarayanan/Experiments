import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { colors, headerHeight } from "../../Styles/Main/variables";
import IconSVG from "../IconSVG";
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  height: ${headerHeight}px;
  background-color: ${colors.tollerantPink};
  position: fixed;
  width: 100%;
  z-index: 2000;
  top: 0;
  justify-content: center;
  color: ${colors.gray}
`;
const NavbarNav = styled.ul`
  flex-direction: row;
`;
const NavItem = styled.li`
  padding: 0 20px;
  font-size: 1.5em;
  :hover {
    color: white;
  }
`;
const NavLinkStyles = styled.div`
  color: inherit;
  line-height: 1;
  &.active,
  &.active:hover {
    color: black;
  }
  :hover {
    color: inherit;
  }
`;
const StyledNavLink = NavLinkStyles.withComponent(NavLink);

export default class Header extends Component {
  render() {
    return (
      <NavbarWrapper className="navbar">
        <NavbarNav className="navbar-nav">
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/journals"
              isActive={(match, location) => {
                return match || location.pathname === "/";
              }}
            >
              <IconSVG name="icon-home" />
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/projects"
              activeClassName="active"
            >
              <IconSVG name="icon-github" />
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/albums"
              activeClassName="active"
            >
              <IconSVG name="icon-camera" />
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/social"
              activeClassName="active"
            >
              <IconSVG name="icon-cool" />
            </StyledNavLink>
          </NavItem>
        </NavbarNav>
      </NavbarWrapper>
    );
  }
}
