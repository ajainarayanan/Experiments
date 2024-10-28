import PropTypes from "prop-types";
import React from "react";
import IconSVGWrapper from "../IconSVG";
import {MetaWrapper} from '../../Styles/Main/components';
import IconStarFull from '../../images/iconstarfull.svg?react';
import IconBubble from '../../images/iconbubble.svg?react';

export default function JournalMeta({ comments_count, stars_count }) {
  return (
    <MetaWrapper>
      <span>
        <IconSVGWrapper><IconBubble/>  </IconSVGWrapper>
        <span>{comments_count}</span>
      </span>
      <span>
        <IconSVGWrapper> <IconStarFull /> </IconSVGWrapper>
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
