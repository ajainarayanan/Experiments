import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import { css } from "glamor";

require("../../images/symbol-defs.svg");

export default function IconSVG(props) {
  const svgStyles = css({
    height: "1em",
    width: "1em",
    verticalAlign: "middle",
    display: "inline-block",
    strokeWidth: 0,
    stroke: "currentColor",
    fill: "currentColor"
  });
  const { name, className, ...moreProps } = props;
  const iconClassName = classnames("icon-svg", name, className);
  const path = `${window.location.href}#symbol-defs_${name}`;

  return (
    <svg className={`${iconClassName} ${svgStyles}`} {...moreProps}>
      <use xlinkHref={path} />
    </svg>
  );
}

IconSVG.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};
