import { combineReducers, createStore } from "redux";

const DEFAULT_ACTION = {
  type: ""
};

const DEFAULT_JOURNALS = {
  list: [],
  headers: {},
  loading: false
};

const DEFAULT_STATE = {
  journals: DEFAULT_JOURNALS
};

export const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_JOURNALS: "SET_JOURNALS"
};

const journals = (state = DEFAULT_JOURNALS, action = DEFAULT_ACTION) => {
  switch (action.type) {
    case ACTIONS.SET_JOURNALS:
      return {
        ...state,
        list: [...action.payload.journals.body],
        headers: {
          ...state.headers,
          ...action.payload.headers
        },
        loading: false
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

const journalsStore = createStore(
  combineReducers({ journals }),
  DEFAULT_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { journalsStore };
