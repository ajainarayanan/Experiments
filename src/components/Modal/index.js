import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { css, media } from "glamor";

const appRoot = document.getElementById("app");
const modalContainerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: "2000"
});
const modalCustomStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",
  marginTop: "60px"
});

const modalLgDialogStyles = css({
  margin: 0,
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  "> div": {
    backgroundColor: "white"
  }
});
const modalSmDialogStyles = css(
  {
    margin: 0,
    width: "50%",
    maxWidth: "50%",
    "> div": {
      backgroundColor: "white"
    }
  },
  media("(max-width: 768px)", {
    width: "100%",
    maxWidth: "100%",
    height: "100%"
  })
);

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggleFunc: PropTypes.func,
    children: PropTypes.node,
    size: PropTypes.oneOf(["sm", "lg"]),
    className: PropTypes.string
  };
  static defaultProps = {
    size: "lg"
  };
  state = {
    isOpen: this.props.isOpen,
    toggleFunc: this.props.toggleFunc
  };
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";
    appRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
    appRoot.removeChild(this.el);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }

  renderChildren = () => {
    if (!this.state.isOpen) {
      return null;
    }
    let modalDialogSize =
      this.props.size === "lg" ? modalLgDialogStyles : modalSmDialogStyles;
    return (
      <div className={`${modalContainerStyles}`}>
        <div className={`modal ${modalCustomStyles}`}>
          <div className={`modal-dialog ${modalDialogSize}`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(this.renderChildren(), this.el);
  }
}
