import PropTypes from "prop-types";
import React from "react";
import styled from 'styled-components';

const IconWrapper = styled.svg`
  height: 1em;
  width: 1em;
  vertical-align: middle;
  display: inline-block;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;
export default function IconSVGWrapper({ children, ...props }) {
  return (
    <IconWrapper
      className={`${IconWrapper} icon-svg`}
      {...props}
    >
      {children}
    </IconWrapper>
  );
}

IconSVGWrapper.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};
