import PropTypes from "prop-types";
import React from "react";
import { css } from "glamor";
import IconSVG from "../IconSVG";
import { spin, headerHeight } from "../../Styles/Theme";

const loadingIndicatorStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "4em",
  height: `calc(100vh - ${headerHeight}px)`
});

const LoadingIndicator = ({ className }) => {
  return (
    <div className={`${loadingIndicatorStyles} ${className}`}>
      <IconSVG name="icon-spinner" className={`${spin}`} />
    </div>
  );
};
LoadingIndicator.propTypes = {
  className: PropTypes.string
};
export default LoadingIndicator;

export const WithLoadingIndicator = ({
  condition,
  children,
  conditionToLoadNewChildren,
  className
}) => {
  if (typeof condition === "function" && condition()) {
    return <LoadingIndicator className={className} />;
  }
  if (typeof condition === "boolean" && condition) {
    return <LoadingIndicator className={className} />;
  }
  let Children = children;
  if (
    typeof conditionToLoadNewChildren === "function" &&
    conditionToLoadNewChildren()
  ) {
    return [
      <Children key="children" />,
      <LoadingIndicator key="loading-indicator" className={className} />
    ];
  }
  if (
    typeof conditionToLoadNewChildren === "boolean" &&
    conditionToLoadNewChildren
  ) {
    return [
      children,
      <LoadingIndicator key="loading-indicator" className={className} />
    ];
  }
  return children;
};

WithLoadingIndicator.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  conditionToLoadNewChildren: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  children: PropTypes.node,
  className: PropTypes.string
};
