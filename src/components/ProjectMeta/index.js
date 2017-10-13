import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
import IconSVG from "../IconSVG";

const ProjectMetaStyles = css({
  margin: "5px 0 0",
  display: "flex",
  "& > span": {
    padding: "0 5px",
    display: "flex",
    alignItems: "center"
  },
  "& .icon-svg": {
    paddingRight: "5px"
  }
});
export { ProjectMetaStyles };
export default function ProjectMeta({
  forks,
  stargazers_count,
  open_issues_count
}) {
  return (
    <div className={`${ProjectMetaStyles}`}>
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
    </div>
  );
}

ProjectMeta.propTypes = {
  forks: PropTypes.number,
  stargazers_count: PropTypes.number,
  open_issues_count: PropTypes.number
};
