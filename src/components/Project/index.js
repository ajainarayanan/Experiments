import PropTypes from "prop-types";
import React from "react";
import HRDate from "../HRDate";
import { cardLayoutStyles } from "../../Styles/Theme";
import ProjectMeta from "../ProjectMeta";
import { css } from "glamor";
import { Link } from "react-router-dom";

const projectMetaStyles = css({
  borderTop: "1px solid",
  margin: "15px 0 0"
});

const Project = ({ info }) => {
  return (
    <Link className={`${cardLayoutStyles}`} to={`/projects/${info.name}`}>
      <div>
        <h5>{info.name}</h5>
        <span>{info.description}</span>
      </div>
      <div className={`${projectMetaStyles}`}>
        <ProjectMeta
          forks={info.forks}
          stargazers_count={info.stargazers_count}
          open_issues_count={info.open_issues_count}
        />
        <HRDate date={info.created_at} />
      </div>
    </Link>
  );
};

Project.propTypes = {
  info: PropTypes.object
};

export default Project;
