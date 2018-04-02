import PropTypes from "prop-types";
import React from "react";
import HRDate from "../HRDate";
import { Card } from "../../Styles/Main/components";
import ProjectMeta from "../ProjectMeta";
import { Link } from "react-router-dom";

const LinkCard = Card.withComponent(Link);

const Project = ({ info }) => {
  return (
    <LinkCard
      to={`/projects/${info.name}`}
    >
      <div>
        <h5>{info.name}</h5>
        <span>{info.description ? info.description : 'No description available'}</span>
      </div>
      <div className="footer">
        <ProjectMeta
          forks={info.forks}
          stargazers_count={info.stargazers_count}
          open_issues_count={info.open_issues_count}
        />
        <HRDate date={info.created_at} />
      </div>
    </LinkCard>
  );
};

Project.propTypes = {
  info: PropTypes.object
};

export default Project;
