import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "prismjs/themes/prism-dark.css";
import "babel-polyfill";
import Loadable from "react-loadable";
import LoadingIndicator from "./components/LoadingIndicator";

import Header from "./components/Header";
import Page404 from "./components/Page404";
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
import GithubLandingPage from "./components/GithubLandingPage";
import { css, media } from "glamor";
import { theme, headerHeight } from "./Styles/Theme";
import { CookiesProvider } from "react-cookie";

const contentStyles = css(
  {
    padding: "0",
    marginTop: "60px",
    borderRight: `1px solid ${theme.main.colors.saturatedPink}`,
    borderLeft: `1px solid ${theme.main.colors.saturatedPink}`,
    borderTop: "0",
    borderBottom: "0",
    minHeight: `calc(100vh - ${headerHeight}px)`,
    "& > div": {
      padding: "10px 30px"
    }
  },
  media("(max-width: 768px)", {
    "& > div": {
      padding: "10px"
    }
  })
);

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
            <div className={`container ${contentStyles}`}>
              <Switch>
                <Route exact path="/" component={Journals} />
                <Route exact path="/journals" component={Journals} />
                <Route
                  exact
                  path="/journals/:journal"
                  component={JournalDetails}
                />
                <Route exact path="/projects" component={Projects} />
                <Route
                  exact
                  path="/projects/:projectid"
                  component={ProjectDetails}
                />
                <Route exact path="/albums" component={Albums} />
                <Route exact path="/githubauth" component={GithubLandingPage} />
                <Route path="/albums/:albumid" component={AlbumDetails} />
                <Route component={Page404} />
              </Switch>
            </div>
          </CookiesProvider>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("app"));
