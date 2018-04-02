import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import styled from 'styled-components';
require("../../images/symbol-defs.svg");

const IconWrapper = styled.svg`
  height: 1em;
  width: 1em;
  vertical-align: middle;
  display: inline-block;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;
export default function IconSVG(props) {
  const { name, className, ...moreProps } = props;
  const iconClassName = classnames("icon-svg", name, className);
  const path = `${window.location.href}#symbol-defs_${name}`;

  return (
    <IconWrapper
      className={`${iconClassName}`}
      {...moreProps}
    >
      <use xlinkHref={path} />
    </IconWrapper>
  );
}

IconSVG.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};
