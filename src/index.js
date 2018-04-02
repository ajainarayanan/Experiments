import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism-dark.css";
import "babel-polyfill";
import Loadable from "react-loadable";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Page404 from "./components/Page404";
import styled, {injectGlobal} from 'styled-components';
import GlobalStyles from './Styles/Main/global-styles';
import GithubLandingPage from "./components/GithubLandingPage";
import { colors, headerHeight } from "./Styles/Main/variables";
import { CookiesProvider } from "react-cookie";

const Journals = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Journals" */ "./components/Journals"),
  loading: LoadingIndicator
});
const Projects = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Projects" */ "./components/Projects"),
  loading: LoadingIndicator
});
const JournalDetails = Loadable({
  loader: () =>
    import(/* webpackChunkName: "JournalDetails" */ "./components/JournalDetails"),
  loading: LoadingIndicator
});
const ProjectDetails = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ProjectDetails" */ "./components/ProjectDetails"),
  loading: LoadingIndicator
});
const Albums = Loadable({
  loader: () => import(/* webpackChunkName: "Albums" */ "./components/Albums"),
  loading: LoadingIndicator
});
const AlbumDetails = Loadable({
  loader: () =>
    import(/* webpackChunkName: "AlbumDetails" */ "./components/AlbumDetails"),
  loading: LoadingIndicator
});
const Social = Loadable({
  loader: () => import(/* webpackChunkName: "Social" */ "./components/Social"),
  loading: LoadingIndicator
});

const Container = styled.div.attrs({
  className: 'container'
})`
  padding: 0;
  margin-top: 60px;
  border-right: 1px solid ${colors.saturatedPink};
  border-left: 1px solid ${colors.saturatedPink};
  border-top: 0;
  border-bottom: 0;
  min-height: calc(100vh - ${headerHeight}px);
  > div {
    padding: 10px 30px;
  }
  media(max-width: 768px) {
    > div {
      padding: 10px;
    }
  }
`;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

injectGlobal`${GlobalStyles}`;

export default class Home extends Component {
  state = {
    journals: []
  };

  componentWillMount() {
    document.title = "Home";
  }

  render() {
    return (
      <Router>
        <div>
          <CookiesProvider>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/" component={Journals} />
                <Route exact path="/journals" component={Journals} />
                <Route
                  exact
                  path="/journals/:journal"
                  render={props => (
                    <ErrorBoundary>
                      <JournalDetails {...props} />
                    </ErrorBoundary>
                  )}
                />
                <Route exact path="/projects" component={Projects} />
                <Route
                  exact
                  path="/projects/:projectid"
                  render={props => (
                    <ErrorBoundary>
                      <ProjectDetails {...props} />
                    </ErrorBoundary>
                  )}
                />
                <Route exact path="/albums" component={Albums} />
                <Route
                  exact
                  path="/githubauth"
                  render={props => (
                    <ErrorBoundary>
                      <GithubLandingPage {...props} />
                    </ErrorBoundary>
                  )}
                />
                <Route
                  path="/albums/:albumid"
                  render={props => (
                    <ErrorBoundary>
                      <AlbumDetails {...props} />
                    </ErrorBoundary>
                  )}
                />
                <Route
                  path="/social"
                  exact
                  render={props => (
                    <ErrorBoundary>
                      {" "}
                      <Social {...props} />{" "}
                    </ErrorBoundary>
                  )}
                />
                <Route component={Page404} />
              </Switch>
            </Container>
          </CookiesProvider>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("app"));
