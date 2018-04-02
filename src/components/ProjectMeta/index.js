import React from "react";
import PropTypes from "prop-types";
import IconSVG from "../IconSVG";
import {MetaWrapper} from '../../Styles/Main/components';

export default function ProjectMeta({
  forks,
  stargazers_count,
  open_issues_count
}) {
  return (
    <MetaWrapper>
      <span>
        <IconSVG name="icon-git-merge" />
        <span>{forks}</span>
      </span>
      <span>
        <IconSVG name="icon-star-full" />
        <span>{stargazers_count}</span>
      </span>
      <span>
        <IconSVG name="icon-issues" />
        <span>{open_issues_count}</span>
      </span>
    </MetaWrapper>
  );
}

ProjectMeta.propTypes = {
  forks: PropTypes.number,
  stargazers_count: PropTypes.number,
  open_issues_count: PropTypes.number
};
