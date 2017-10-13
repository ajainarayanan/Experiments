import React from "react";
import { projectsStore } from "./store";
import { fetchProjects } from "./store/ActionCreator";
import { Provider } from "react-redux";
import ProjectsList from "../ProjectsList";
import ErrorBoundary from "../ErrorBoundary";

export default function Projects() {
  const { projects } = projectsStore.getState();
  if (!projects.list.length) {
    fetchProjects();
  }
  document.title = "Projects";
  return (
    <Provider store={projectsStore}>
      <ErrorBoundary>
        <ProjectsList />
      </ErrorBoundary>
    </Provider>
  );
}
