import PropTypes from "prop-types";
import React from "react";
import HRDate from "../HRDate";
import { colors } from "../../Styles/Main/variables";
import IconSVG from "../IconSVG";
import styled from 'styled-components';

const DateTimeWrapper = styled.div`
  color: ${colors.red}
`;

export default function DateTime({ datetime }) {
  return (
    <DateTimeWrapper>
      <IconSVG name="icon-clock" />
      <HRDate date={datetime} />
    </DateTimeWrapper>
  );
}

DateTime.propTypes = {
  datetime: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
