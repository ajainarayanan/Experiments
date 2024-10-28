import PropTypes from "prop-types";
import React from "react";
import IconSVGWrapper from "../IconSVG";
import { headerHeight } from "../../Styles/Main/variables";
import { Spin } from "../../Styles/Main/components";
import styled from 'styled-components';

const LoadingIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  height: calc(100vh - ${headerHeight}px);
`;
const SpinnerIcon = Spin.withComponent(IconSVGWrapper);

const LoadingIndicator = ({ className }) => {
  return (
    <LoadingIndicatorWrapper className={`${className}`}>
      <SpinnerIcon name="icon-spinner" />
    </LoadingIndicatorWrapper>
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
