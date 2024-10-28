import PropTypes, { instanceOf } from "prop-types";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Cookies, withCookies } from "react-cookie";
import "whatwg-fetch";
import { WithLoadingIndicator } from "../LoadingIndicator";
import querystring from "query-string";

class GithubLandingPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    cookies: instanceOf(Cookies)
  };
  state = {
    redirect: false,
    redirect_uri: ""
  };

  async componentWillMount() {
    let github_auth_state = this.props.cookies.get("GITHUB_AUTH_STATE");
    let github_post_auth_redirect_uri = this.props.cookies.get(
      "GITHUB_POST_AUTH_REDIRECT_URI"
    );
    let { code, state } = querystring.parse(this.props.location.search);
    if (state !== github_auth_state) {
      console.log("You shall not pass!! ", state, github_auth_state);
      return;
    }
    let user_access_token = await fetch(
      `/api/getghauthtoken?code=${code}`
    ).then(res => res.json());
    this.props.cookies.set("GITHUB_AUTH_TOKEN", user_access_token);
    this.props.cookies.set("GITHUB_AUTH_TOKEN_TIME", Date.now());
    this.setState({
      redirect: true,
      redirect_uri: github_post_auth_redirect_uri
    });
  }
  render() {
    return (
      <WithLoadingIndicator condition={!this.state.redirect}>
        <Redirect to={this.state.redirect_uri} />
      </WithLoadingIndicator>
    );
  }
}

export default withCookies(GithubLandingPage);
