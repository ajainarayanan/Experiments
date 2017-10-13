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
      albums: albums
    }
  });
}

export async function fetchAlbumDetails(albumid, page_num = 1) {
  albumStore.dispatch({
    type: ACTIONS.SET_ALUBUM_DETAILS_LOADING
  });
  let url = `/api/albums/${albumid}?&page_num=${page_num}`;
  let albumDetails = await fetch(url).then(res => res.json());
  albumStore.dispatch({
    type: ACTIONS.SET_ALUBUM_DETAILS,
    payload: {
      albumid,
      albumDetails
    }
  });
}
