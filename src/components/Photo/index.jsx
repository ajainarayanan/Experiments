import PropTypes from "prop-types";
import React, { Component } from "react";
import Modal from "../Modal";
import { albumStore } from "../Albums/store";
import { WithLoadingIndicator } from "../LoadingIndicator";
import IconSVGWrapper from "../IconSVG";
import { Link, Redirect } from "react-router-dom";
import "whatwg-fetch";
import Mousetrap from "mousetrap";
import Page404 from "../Page404";
import IconCross from '../../images/iconcross.svg?react';
import styled from 'styled-components';

const ImgContainer = styled.img`
  width: 100%;
  object-fit: contain;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const CloseBtn = styled.div`
  text-align: right;
  position: absolute;
  right: 20px;
  z-index: 2000;
  top: 20px;
  background: white;
  padding: 5px;
  border-radius: 50%;
  display: inline-flex;
  > a {
    line-height: 1;
    color: white;
    display: flex;
  }
`;
const ModalContent = styled.div`
  background: black;
  height: 100vh;
`;
export default class Photo extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
  };

  state = {
    photoid: this.props.match.params.photoid,
    albumid: this.props.match.params.albumid,
    photoUrl: null,
    photoTitle: null,
    loading: true,
    error: null,
    redirect: false
  };
  fetchPhotoIndividually = async () => {
    let photoDetails = await fetch(
      `/api/photos/${this.state.photoid}`
    ).then(res => res.json());

    if (photoDetails.statusCode === 404) {
      this.setState({ error: photoDetails });
      return;
    }
    let photo = photoDetails.sizes.size.find(size => size.label === "Original");
    if (photo) {
      this.setState({
        loading: false,
        photoUrl: photo.source
      });
      if (this.albumStoreSubscription) {
        this.albumStoreSubscription();
      }
    }
  };

  getPhotoDetails = () => {
    let { albumsDetails } = albumStore.getState();
    if (!Object.keys(albumsDetails.map).length) {
      return;
    }
    let { params } = this.props.match;
    let currentAlbum = albumsDetails.map[params.albumid];
    let currentPhoto = currentAlbum.photo.find(
      photo => photo.id === params.photoid
    );
    if (currentPhoto) {
      return {
        photoUrl: currentPhoto.url_h,
        photoTitle: currentPhoto.title,
        loading: false
      };
    }
    this.fetchPhotoIndividually(this.state.photoid);
    return false;
  };
  componentDidMount() {
    Mousetrap.bind("esc", () => this.setState({ redirect: true }));
    this.albumStoreSubscription = albumStore.subscribe(() => {
      let newState = this.getPhotoDetails();
      if (newState) {
        this.setState({
          ...newState
        });
        return;
      }
    });
    let initialState = this.getPhotoDetails();
    if (initialState) {
      this.setState({
        ...initialState
      });
    }
  }
  componentWillUnmount() {
    if (this.albumStoreSubscription) {
      this.albumStoreSubscription();
    }
  }
  render() {
    if (this.state.error) {
      throw new Error(JSON.stringify(this.state.error, null, 2));
    }
    if (this.state.redirect) {
      return <Redirect to={`/albums/${this.state.albumid}`} />;
    }
    return (
      <Modal isOpen={true} size="lg">
        <WithLoadingIndicator condition={this.state.loading}>
          {this.state.notFound ? (
            <Page404 />
          ) : (
            [
              <CloseBtn key="icon">
                <Link to={`/albums/${this.state.albumid}`}>
                  <IconSVGWrapper>
                    <IconCross/>
                  </IconSVGWrapper>
                </Link>
              </CloseBtn>,
              <ModalContent
                className="modal-content"
                key="modal-content"
              >
                <div className="modal-body">
                  <ImgContainer
                    src={this.state.photoUrl}
                    alt={this.state.photoTitle}
                  />
                </div>
              </ModalContent>
            ]
          )}
        </WithLoadingIndicator>
      </Modal>
    );
  }
}
