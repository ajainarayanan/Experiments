import React from "react";
import { Provider } from "react-redux";
import { journalsStore } from "./store";
import JournalList from "../JournalsList";
import { fetchJournals } from "./store/ActionCreator";
import ErrorBoundary from "../ErrorBoundary";

export default function Journals() {
  let { journals } = journalsStore.getState();
  if (!journals.list.length) {
    fetchJournals();
  }
  document.title = "Journals";
  return (
    <Provider store={journalsStore}>
      <ErrorBoundary>
        <JournalList />
      </ErrorBoundary>
    </Provider>
  );
}
