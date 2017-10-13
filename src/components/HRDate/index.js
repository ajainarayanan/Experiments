import PropTypes from "prop-types";
import React from "react";
import moment from "moment";

export default function HRDate({ date, ...restProps }) {
  return (
    <small {...restProps}>
      {" "}
      {moment(date).format("MMMM Do YYYY, h:mm:ss a")}
    </small>
  );
}

// Can be unix time stamp, or stirng with '2017-09-29T16:44:32Z' or a Date object
HRDate.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number
  ])
};
