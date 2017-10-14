import PropTypes from "prop-types";
import React, { Component } from "react";
import Page404 from "../Page404";
import Page403 from "../Page403";
import Page500 from "../Page500";

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    statusCode: null,
    message: "",
    trace: null
  };
  componentDidCatch(error, trace) {
    let err, message, statusCode;
    try {
      err = JSON.parse(error.message);
      message = err.message || "Something went wrong";
      statusCode = err.statusCode || 500;
    } catch (e) {
      message = "Something went wrong";
      statusCode = 500;
    }

    this.setState({
      statusCode,
      message,
      trace: trace.componentStack
    });
  }

  render() {
    if (!this.state.statusCode) {
      return this.props.children;
    }
    if (this.state.statusCode === 404) {
      return <Page404 trace={this.state.trace} />;
    }
    if (this.state.statusCode === 403) {
      return <Page403 />;
    }
    if (this.state.statusCode === 500) {
      return <Page500 trace={this.state.trace} />;
    }
    return (
      <div className="container">
        <pre className="language-js">{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
