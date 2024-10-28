import "whatwg-fetch";
import { projectsStore, ACTIONS } from "../store";

export const fetchProjects = () => {
  projectsStore.dispatch({
    type: ACTIONS.SET_LOADING
  });
  fetch("/api/projects?page_num=1")
    .then(res => res.json())
    .then(res => {
      projectsStore.dispatch({
        type: ACTIONS.SET_PROJECTS,
        payload: {
          projects: res
        }
      });
    });
};

export const fetchProjectDetails = projectId => {
  return fetch(`/api/projects/${projectId}`).then(res => res.json());
};

export const fetchProjectReadme = projectId => {
  return fetch(`/api/projects/${projectId}/readme`).then(res => res.json());
};
