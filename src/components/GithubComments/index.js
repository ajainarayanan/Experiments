import PropTypes from "prop-types";
import React, { Component } from "react";
import "whatwg-fetch";
import GithubCommentBox from "../GithubCommentBox";
import { css, after } from "glamor";
import HRDate from "../HRDate";
import { theme } from "../../Styles/Theme";
import IconSVG from "../IconSVG";
import { WithLoadingIndicator } from "../LoadingIndicator";

const commentsStyles = css({
  margin: "20px 0"
});
const emptyCommentsTextStyles = css({
  textAlign: "center",
  border: 0
});

const commentStyles = css({
  display: "flex",
  margin: "0 0 5px 0",
  borderBottom: "1px solid",
  paddingBottom: "10px"
});
const profilePicStyle = css({
  width: "60px", // this 60 seems to repeat. Should extract it out with a meaningful name
  height: "100%",
  borderRadius: "4px"
});
const commentBodyStyle = css(
  {
    padding: "0 10px 5px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: theme.main.colors.lightenPurple,
    marginLeft: "10px",
    position: "relative",
    color: "white",
    width: "100%"
  },
  after({
    content: '""',
    position: "absolute",
    width: "10px",
    height: "10px",
    left: "-10px",
    top: "20px",
    borderTop: "10px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: `10px solid ${theme.main.colors.lightenPurple}`
  })
);
const timeStyle = css({ color: theme.main.colors.red });
const loadingIndicatorStyles = css({ height: "100%" });

export default class GithubComments extends Component {
  static propTypes = {
    journalId: PropTypes.string
  };
  state = {
    loading: true,
    comments: [],
    id: this.props.journalId
  };
  fetchComments = async () => {
    this.setState({ loading: true });
    let comments = await fetch(
      `/api/journals/${this.props.journalId}/comments`
    ).then(res => res.json());
    comments = comments.body;
    this.setState({ comments, loading: false });
  };

  componentWillMount() {
    this.fetchComments();
  }
  render() {
    return (
      <div className={`${commentsStyles}`}>
        <h3> Comments </h3>
        <WithLoadingIndicator
          condition={this.state.loading}
          className={`${loadingIndicatorStyles}`}
        >
          {this.state.comments.length ? (
            this.state.comments.map((comment, i) => (
              <div key={i} className={`${commentStyles}`}>
                <a href={comment.user.html_url}>
                  <img
                    src={comment.user.avatar_url}
                    className={profilePicStyle}
                  />
                </a>
                <div className={`${commentBodyStyle}`}>
                  <div>{comment.body}</div>
                  <div className={`${timeStyle}`}>
                    <IconSVG name="icon-clock" />
                    <HRDate date={comment.updated_at} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className={`${emptyCommentsTextStyles}`}> No Comments </h5>
          )}
          <GithubCommentBox id={this.state.id} onSubmit={this.fetchComments} />
        </WithLoadingIndicator>
      </div>
    );
  }
}
