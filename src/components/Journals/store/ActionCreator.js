import "whatwg-fetch";
import { journalsStore, ACTIONS } from "../store";

export const fetchJournals = () => {
  journalsStore.dispatch({
    type: ACTIONS.SET_LOADING
  });
  fetch("/api/journals?page_num=1")
    .then(res => res.json())
    .then(res => {
      journalsStore.dispatch({
        type: ACTIONS.SET_JOURNALS,
        payload: {
          journals: res
        }
      });
    });
};

export const fetchJournalDetails = journalId => {
  return fetch(`/api/journals/${journalId}`).then(res => res.json());
};
