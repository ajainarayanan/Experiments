import React from "react";
import { Provider } from "react-redux";
import { albumStore } from "./store";
import AlbumsList from "../AlbumsList";
import { fetchAlbums } from "./store/ActionCreator";
import ErrorBoundary from "../ErrorBoundary";

export default function Albums() {
  let { albums } = albumStore.getState();
  if (!albums.list.length) {
    fetchAlbums();
  }
  document.title = "Albums";
  return (
    <Provider store={albumStore}>
      <ErrorBoundary>
        <AlbumsList />
      </ErrorBoundary>
    </Provider>
  );
}
