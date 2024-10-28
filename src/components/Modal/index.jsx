import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

const appRoot = document.getElementById("app");
const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: rgba(0,0,0,0.5);
  z-index: 2000;
`;

const ModalInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  margin-top: 60p;
`;
const ModalLg = styled.div`
  margin: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  > div {
    background-color: white;
  }
`;
const ModalSm = styled.div`
  margin: 0;
  width: 50%;
  max-width: 50%;
  > div {
    background-color: white;
  }
  @media(max-width: 768px) {
    width: 100%;
    maxWidth: 100%;
    height: 100%;
  }
`;

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
    let ModalContent =
      this.props.size === "lg" ? ModalLg : ModalSm;
    return (
      <ModalWrapper>
        <ModalInnerContainer className="modal">
          <ModalContent className="modal-dialog">
            {this.props.children}
          </ModalContent>
        </ModalInnerContainer>
      </ModalWrapper>
    );
  };
  render() {
    return ReactDOM.createPortal(this.renderChildren(), this.el);
  }
}
