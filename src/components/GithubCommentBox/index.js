import PropTypes, { instanceOf } from "prop-types";
import React, { Component } from "react";
import { Cookies, withCookies } from "react-cookie";
import { css } from "glamor";
import { buttonStyles } from "../../Styles/Theme";
import shortid from "shortid";
import { WithLoadingIndicator } from "../LoadingIndicator";

const commentBoxStyles = css({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "flex-end"
});
const singinBtnContainerStyles = css({
  position: "absolute",
  top: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0,0,0,0.2)"
});
const commentSubmitBoxStyles = css({
  display: "flex",
  width: "100%",
  "> img": {
    width: "60px",
    height: "100%"
  },
  "& .form-control": {
    borderRadius: 0
  },
  "& textarea": {
    minHeight: "60px"
  }
});
const submitBtnStyles = css({
  width: "200px",
  margin: "10px 0"
});
const GITHUB_AUTH_REDIRECT_URI = "https://github.com/login/oauth/authorize";

class GithubCommentBox extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    cookies: instanceOf(Cookies)
  };

  state = {
    comment: "",
    access_token: null,
    userDetails: null,
    loading: false
  };

  async componentWillMount() {
    if (!window.GITHUB_CLIENT_ID) {
      let github_client_id = await fetch("/api/getghclientid").then(res =>
        res.text()
      );
      window.GITHUB_CLIENT_ID = github_client_id;
    }
    let gh_user_token = this.props.cookies.get("GITHUB_AUTH_TOKEN");
    let tokenTime = this.props.cookies.get("GITHUB_AUTH_TOKEN_TIME");
    if (tokenTime - Date.now() > 3600000) {
      gh_user_token = null;
      this.props.cookies.remove("GITHUB_AUTH_TOKEN_TIME", { path: "/" });
    }
    if (!gh_user_token) {
      return;
    }
    this.setState(
      {
        access_token: gh_user_token.access_token
      },
      this.fetchUserInfo
    );
  }

  handleCommentOnChange = e => this.setState({ comment: e.target.value });

  submitComment = async () => {
    if (!this.state.comment || !this.state.comment.length) {
      return;
    }
    this.setState({ loading: true });
    await fetch(`https://api.github.com/gists/${this.props.id}/comments`, {
      headers: {
        Authorization: `token ${this.state.access_token}`
      },
      method: "POST",
      body: JSON.stringify({
        body: this.state.comment
      })
    }).then(res => res.json());
    this.setState({ comment: "", loading: false });
    this.props.onSubmit();
  };

  isSubmitBtnDisabled = () =>
    this.state.loading || !this.state.comment || !this.state.comment.length;

  fetchUserInfo = async () => {
    let userDetails = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${this.state.access_token}`
      }
    }).then(res => res.json());
    this.setState({
      userDetails
    });
  };

  isCommentBoxLoading = () => {
    return this.state.access_token && !this.state.userDetails;
  };
  renderCommentBoxWithSubmit = () => {
    return [
      <div className={`${commentSubmitBoxStyles}`} key="comment-area">
        <img
          src={this.state.userDetails.avatar_url}
          title={this.state.userDetails.login}
        />
        <textarea
          className="form-control"
          value={this.state.comment}
          onChange={this.handleCommentOnChange}
        />
        <hr />
      </div>,
      <button
        className={`${buttonStyles} ${submitBtnStyles}`}
        disabled={this.isSubmitBtnDisabled()}
        key="submit-btn"
        onClick={this.submitComment}
      >
        Submit
      </button>
    ];
  };

  handleGithubAuth = () => {
    this.props.cookies.set(
      "GITHUB_POST_AUTH_REDIRECT_URI",
      window.location.pathname,
      { path: "/" }
    );
    let github_state_id = shortid.generate();
    this.props.cookies.set("GITHUB_AUTH_STATE", github_state_id, { path: "/" });
    window.location.href = `${GITHUB_AUTH_REDIRECT_URI}?client_id=${window.GITHUB_CLIENT_ID}&state=${github_state_id}&scope=gist`;
  };
  renderContent = () => {
    if (!this.state.access_token) {
      return (
        <div className={`${commentSubmitBoxStyles}`}>
          <textarea className="form-control" disabled />
          <div className={`${singinBtnContainerStyles}`}>
            <button
              className={`${buttonStyles}`}
              onClick={this.handleGithubAuth}
            >
              Signin via Github to Comment
            </button>
          </div>
        </div>
      );
    }
    return (
      <WithLoadingIndicator condition={this.isCommentBoxLoading}>
        {!this.isCommentBoxLoading() ? this.renderCommentBoxWithSubmit() : null}
      </WithLoadingIndicator>
    );
  };
  render() {
    return <div className={`${commentBoxStyles}`}>{this.renderContent()}</div>;
  }
}

export default withCookies(GithubCommentBox);
