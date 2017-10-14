import "whatwg-fetch";
import { albumStore, ACTIONS } from "../store";

export async function fetchAlbums() {
  albumStore.dispatch({
    type: ACTIONS.SET_LOADING
  });
  let albums = await fetch("/api/albums").then(res => res.json());
  albumStore.dispatch({
    type: ACTIONS.SET_ALBUMS,
    payload: {
      albums: albums.body
    }
  });
}

export async function fetchAlbumDetails(albumid, page_num = 1) {
  albumStore.dispatch({
    type: ACTIONS.SET_ALUBUM_DETAILS_LOADING
  });
  let url = `/api/albums/${albumid}?&page_num=${page_num}`;
  let albumDetails = await fetch(url).then(res => res.json());
  if (albumDetails.statusCode !== 200) {
    albumStore.dispatch({
      type: ACTIONS.SET_ALBUM_DETAILS_ERROR,
      payload: {
        error: albumDetails
      }
    });
    return;
  }
  albumStore.dispatch({
    type: ACTIONS.SET_ALUBUM_DETAILS,
    payload: {
      albumid,
      albumDetails: albumDetails.body
    }
  });
}
