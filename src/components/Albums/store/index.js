import { combineReducers, createStore } from "redux";

const DEFAULT_ACTION = {
  type: ""
};

const DEFAULT_ALBUMS = {
  list: [],
  loading: false
};

const DEFAULT_ALBUMS_DETAILS = {
  loading: false,
  map: {}
};

const DEFAULT_STATE = {
  albums: DEFAULT_ALBUMS
};

export const ACTIONS = {
  SET_ALBUMS: "SET_ALBUMS",
  SET_LOADING: "SET_LOADING",
  SET_ALUBUM_DETAILS: "SET_ALUBUM_DETAILS",
  SET_ALUBUM_DETAILS_LOADING: "SET_ALUBUM_DETAILS_LOADING"
};

const albums = (state = DEFAULT_ALBUMS, action = DEFAULT_ACTION) => {
  switch (action.type) {
    case ACTIONS.SET_ALBUMS:
      return {
        ...state,
        list: action.payload.albums,
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

const albumsDetails = (
  state = DEFAULT_ALBUMS_DETAILS,
  action = DEFAULT_ACTION
) => {
  switch (action.type) {
    case ACTIONS.SET_ALUBUM_DETAILS: {
      let albumInState = state.map[action.payload.albumid];
      if (!albumInState) {
        albumInState = { photo: [] };
      }
      return {
        ...state,
        map: {
          ...state.map,
          [action.payload.albumid]: {
            ...albumInState,
            ...action.payload.albumDetails,
            photo: [...albumInState.photo, ...action.payload.albumDetails.photo]
          }
        },
        loading: false
      };
    }
    case ACTIONS.SET_ALUBUM_DETAILS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

const albumStore = createStore(
  combineReducers({ albums, albumsDetails }),
  DEFAULT_STATE,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { albumStore };
