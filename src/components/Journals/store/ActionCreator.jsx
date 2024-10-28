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
      res.body.forEach(async journal => {
        fetchJounalStars(journal.id).then(stars => {
          journalsStore.dispatch({
            type: ACTIONS.SET_JOURNAL_STARS,
            payload: {
              journalId: journal.id,
              stars
            }
          });
        });
      });
    });
};

export const fetchJournalDetails = journalId => {
  return fetch(`/api/journals/${journalId}`).then(res => res.json());
};

export const fetchJounalStars = async jounalId => {
  let stars = await fetch(`/api/journals/${jounalId}/stars`).then(res =>
    res.text()
  );
  return stars;
};
