import PropTypes from "prop-types";
import React from "react";
import IconSVG from "../IconSVG";
import { ProjectMetaStyles } from "../ProjectMeta";

export default function JournalMeta({ comments_count, stars_count }) {
  return (
    <div className={`${ProjectMetaStyles}`}>
      <span>
        <IconSVG name="icon-bubble" />
        <span>{comments_count}</span>
      </span>
      <span>
        <IconSVG name="icon-star-full" />
        <span>{typeof stars_count === "undefined" ? "..." : stars_count}</span>
      </span>
      {/*One day when I get stars >*< */}
    </div>
  );
}

JournalMeta.propTypes = {
  comments_count: PropTypes.number,
  stars_count: PropTypes.number
};
