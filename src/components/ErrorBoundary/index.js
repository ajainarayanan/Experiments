import PropTypes from "prop-types";
import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    hasError: false,
    message: null,
    info: null
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true, message: error.message, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h4 key="message"> {JSON.stringify(this.state.message, null, 2)}</h4>
          <pre key="info">
            <code className="language-js" style={{ color: "red" }}>
              {this.state.info.componentStack}
            </code>
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
