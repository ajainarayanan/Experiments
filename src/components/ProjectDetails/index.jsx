import PropTypes from "prop-types";
import React, { Component, Suspense } from "react";
import {
  fetchProjectDetails,
  fetchProjectReadme
} from "../Projects/store/ActionCreator";
import LoadingIndicator, { WithLoadingIndicator } from "../LoadingIndicator";
import DateTime from "../DateTime";
import AvatarSM from "../AvatarSM";
import { HeadingLink } from "../../Styles/Main/components";
import ProjectMeta from "../ProjectMeta";
import IconSVGWrapper from "../IconSVG";

const WrapSuspense = (child) => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      {child}
    </Suspense>
  )
}
const MarkdownComponent = React.lazy(() => import("../Markdown/index.jsx"))
const Markdown = (props) => WrapSuspense(<MarkdownComponent {...props}/>)
export default class ProjectDetails extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
  };
  state = {
    error: null,
    loading: true,
    details: {}
  };
  componentDidMount() {
    let { params } = this.props.match;
    Promise.all([
      fetchProjectDetails(params.projectid),
      fetchProjectReadme(params.projectid)
    ]).then(res => {
      if (res[0].statusCode !== 200) {
        this.setState({ error: res[0], loading: false });
        return;
      }
      if (res[1].statusCode !== 200) {
        this.setState({ error: res[1], loading: false });
        return;
      }
      let details = res[0].body;
      let readme = res[1].body;
      document.title = `Projects - ${details.name}`;
      this.setState({
        details,
        readme,
        loading: false
      });
    });
  }
  renderContent = () => {
    let {
      name: title,
      parent,
      html_url,
      forks,
      stargazers_count,
      open_issues_count
    } = this.state.details;
    return (
      <div className={`project-detail-container container`}>
        <h2>
          <HeadingLink
            href={html_url}
            target="_blank"
          >
            {title}
            <small>
              <IconSVGWrapper name="icon-new-tab" />
            </small>
          </HeadingLink>
        </h2>
        <ProjectMeta
          forks={forks}
          stargazers_count={stargazers_count}
          open_issues_count={open_issues_count}
        />
        {parent ? (
          <small>
            <span>Forked from </span>
            <HeadingLink
              target="_blank"
              href={parent.html_url}
            >
              {parent.full_name}
            </HeadingLink>
          </small>
        ) : null}
        <DateTime datetime={this.state.created_at} />
        <AvatarSM
          name={this.state.details.owner.login}
          imgUrl={this.state.details.owner.avatar_url}
          profileLink={this.state.details.owner.html_url}
        />
        {!this.state.readme ? (
          <h2>
            No README.md found. Please explore the repo by
            <HeadingLink
              target="_blank"
              href={html_url}
            >
              {" "}
              Clicking here{" "}
            </HeadingLink>
          </h2>
        ) : (
          <Markdown markdown={this.state.readme} />
        )}
      </div>
    );
  };
  render() {
    if (this.state.error) {
      throw new Error(JSON.stringify(this.state.error, null, 2));
    }
    return (
      <WithLoadingIndicator condition={this.state.loading}>
        {this.state.loading ? null : this.renderContent()}
      </WithLoadingIndicator>
    );
  }
}
