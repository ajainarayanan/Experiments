import React from "react";
import PropTypes from "prop-types";
import IconSVGWrapper from "../IconSVG";
import {MetaWrapper} from '../../Styles/Main/components';
import IconIssues from '../../images/iconissues.svg?react';
import IconStarFull from '../../images/iconstarfull.svg?react';
import IconGitMerge from '../../images/icongitmerge.svg?react';

export default function ProjectMeta({
  forks,
  stargazers_count,
  open_issues_count
}) {
  return (
    <MetaWrapper>
      <span>
        <IconSVGWrapper> <IconGitMerge /> </IconSVGWrapper>
        <span>{forks}</span>
      </span>
      <span>
        <IconSVGWrapper><IconStarFull/> </IconSVGWrapper>
        <span>{stargazers_count}</span>
      </span>
      <span>
        <IconSVGWrapper> <IconIssues /> </IconSVGWrapper>
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
