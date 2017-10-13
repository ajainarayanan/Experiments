import { createStore, combineReducers } from "redux";

const DEFAULT_ACTION = {
  type: ""
};
export const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_PROJECTS: "SET_PROJECTS"
};

const DEFAULT_PROJECTS = {
  list: [],
  loading: false
};

const DEFAULT_STATE = {
  projects: DEFAULT_PROJECTS
};

const projects = (state = DEFAULT_PROJECTS, action = DEFAULT_ACTION) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ACTIONS.SET_PROJECTS:
      return {
        ...state,
        list: [...action.payload.projects.body],
        loading: false
      };
    default:
      return state;
  }
};

export const projectsStore = createStore(
  combineReducers({ projects }),
  DEFAULT_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
