import PropTypes from "prop-types";
import React from "react";
import IconSVG from "../IconSVG";
import {MetaWrapper} from '../../Styles/Main/components';

export default function JournalMeta({ comments_count, stars_count }) {
  return (
    <MetaWrapper>
      <span>
        <IconSVG name="icon-bubble" />
        <span>{comments_count}</span>
      </span>
      <span>
        <IconSVG name="icon-star-full" />
        <span>
          {typeof stars_count === "undefined" || stars_count === null
            ? "..."
            : stars_count}
        </span>
      </span>
      {/*One day when I get stars >*< */}
    </MetaWrapper>
  );
}

JournalMeta.propTypes = {
  comments_count: PropTypes.number,
  stars_count: PropTypes.number
};
