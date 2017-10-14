import PropTypes from "prop-types";
import React, { Component } from "react";
import { fetchJournalDetails } from "../Journals/store/ActionCreator";
import LoadingIndicator, { WithLoadingIndicator } from "../LoadingIndicator";
import AvatarSM from "../AvatarSM";
import DateTime from "../DateTime";
import Loadable from "react-loadable";
import GithubComments from "../GithubComments";
import ErrorBoundary from "../ErrorBoundary";
const Markdown = Loadable({
  loader: () => import(/* webpackChunkName: "Markdown" */ "../Markdown"),
  loading: LoadingIndicator
});

export default class JournalDetails extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
  };
  state = {
    error: null,
    loading: true,
    details: {}
  };
  async componentDidMount() {
    let { params } = this.props.match;
    let details = await fetchJournalDetails(params.journal);
    if (details.statusCode !== 200) {
      this.setState({ error: details });
      return;
    }
    this.setState(
      {
        details: details.body,
        loading: false
      },
      () => {
        document.title = `Journals - ${this.state.details.description}`;
      }
    );
  }
  renderContent = () => {
    let { files, description: title, id: journalId } = this.state.details;
    let [file] = Object.keys(files).map(file => files[file]);
    let { content } = file;
    return (
      <div className={`container`}>
        <h2>{title}</h2>
        <DateTime datetime={this.state.details.create_at} />
        <AvatarSM
          name={this.state.details.owner.login}
          imgUrl={this.state.details.owner.avatar_url}
          profileLink={this.state.details.owner.html_url}
        />
        <Markdown markdown={content} />
        <GithubComments journalId={journalId} />
      </div>
    );
  };
  render() {
    if (this.state.error) {
      throw new Error(JSON.stringify(this.state.error, null, 2));
    }
    return (
      <ErrorBoundary>
        <WithLoadingIndicator condition={this.state.loading}>
          {this.state.loading ? null : this.renderContent()}
        </WithLoadingIndicator>
      </ErrorBoundary>
    );
  }
}
