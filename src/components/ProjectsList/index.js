import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { CardWrapper } from "../../Styles/Main/components";
import { WithLoadingIndicator } from "../LoadingIndicator";
import Project from "../Project";

const ProjectsListWrapper = CardWrapper.extend`
  grid-auto-rows: minmax(250px, auto);
`;

const ProjectsList = ({ projects, loading }) => {
  return (
    <WithLoadingIndicator condition={loading}>
      <ProjectsListWrapper>
        {projects.length
          ? projects.map(project => {
              return <Project info={project} key={project.id} />;
            })
          : null}
      </ProjectsListWrapper>
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
