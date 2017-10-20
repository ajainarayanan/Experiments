import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { cardLayoutParent } from "../../Styles/Theme";
import { WithLoadingIndicator } from "../LoadingIndicator";
import Project from "../Project";

const ProjectsList = ({ projects, loading }) => {
  return (
    <WithLoadingIndicator condition={loading}>
      <div className={`projects-list-container ${cardLayoutParent}`}>
        {projects.length
          ? projects.map(project => {
              return <Project info={project} key={project.id} />;
            })
          : null}
      </div>
    </WithLoadingIndicator>
  );
};

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    projects: state.projects.list,
    loading: state.projects.loading
  };
};

export default connect(mapStateToProps)(ProjectsList);
