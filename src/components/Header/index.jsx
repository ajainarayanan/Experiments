import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { colors, headerHeight } from "../../Styles/Main/variables";
import IconSVGWrapper from "../IconSVG";
import styled from 'styled-components';
import Iconhome from '../../images/iconhome.svg?react';
import IconGithub from '../../images/icongithub.svg?react';
import IconCamera from '../../images/iconcamera.svg?react';
import IconCool from '../../images/iconcool.svg?react';

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
  justify-content: center;
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
      <NavbarWrapper>
        <NavbarNav className="navbar-nav">
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/journals"
              isActive={(match, location) => {
                return match || location.pathname === "/";
              }}
            >
              <IconSVGWrapper><Iconhome /></IconSVGWrapper>   
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/projects"
              activeClassName="active"
            >
              <IconSVGWrapper><IconGithub /> </IconSVGWrapper>
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/albums"
              activeClassName="active"
            >
              <IconSVGWrapper><IconCamera /></IconSVGWrapper>
            </StyledNavLink>
          </NavItem>
          <NavItem>
            <StyledNavLink
              className="nav-link"
              to="/social"
              activeClassName="active"
            >
              <IconSVGWrapper><IconCool /></IconSVGWrapper>
            </StyledNavLink>
          </NavItem>
        </NavbarNav>
      </NavbarWrapper>
    );
  }
}
