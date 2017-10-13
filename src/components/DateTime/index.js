import PropTypes from "prop-types";
import React from "react";
import { css } from "glamor";
import HRDate from "../HRDate";
import { theme } from "../../Styles/Theme";
import IconSVG from "../IconSVG";

const creat_datetime_styles = css({
  color: theme.main.colors.red
});

export default function DateTime({ datetime }) {
  return (
    <div className={`${creat_datetime_styles}`}>
      <IconSVG name="icon-clock" />
      <HRDate date={datetime} />
    </div>
  );
}

DateTime.propTypes = {
  datetime: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
