import PropTypes from "prop-types";
import React, { Component } from "react";
import LoadingIndicator, { WithLoadingIndicator } from "../LoadingIndicator";
import { fetchAlbumDetails } from "../Albums/store/ActionCreator";
import { colors, boxShadow, borderRadius } from "../../Styles/Main/variables";
import AvatarSM from "../AvatarSM";
import { Link, Route } from "react-router-dom";
import { albumStore } from "../Albums/store";
import Loadable from "react-loadable";
import styled from 'styled-components';

if (typeof IntersectionObserver === "undefined") {
  require("intersection-observer");
}
const Photo = Loadable({
  loader: () => import(/* webpackChunkName: "Photo" */ "../Photo"),
  loading: LoadingIndicator
});
const AlbumsDetailsWrapper = styled.div`
  padding: 10px 30px;
`;

const AlbumDetailsContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 200px;
  grid-auto-flow: row dense;
  margin-top: 20px;
`;
const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  box-shadow: ${boxShadow(colors.orange)};
  border: 1px solid ${colors.tollerantPink};
  transition: transform  0.3s ease-in-out;
  border-radius: ${borderRadius};
  padding: 10px;
  .image-container {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  &:hover {
    boxShadow: 0px 0px 10px 2px ${colors.orange};
  }
`;
const MediumSizeImage = ImageContainer.extend`
  grid-row: span 3;

  @media(max-width: 768px) {
    grid-row: span 1;
  }
`;
const LastImage = ImageContainer.extend`
  grid-column: span 1;
  grid-row: span 1;
  
  @media(max-width: 768px) {
    grid-row: span 1;
    grid-column: span 1;
  }
`;
export default class AlbumDetails extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
  };

  state = {
    loading: true,
    error: null,
    albumid: "",
    details: {
      photo: []
    }
  };

  constructor() {
    super();
    this.getPhotos = this.getPhotos.bind(this);
  }

  async componentDidMount() {
    let { params } = this.props.match;
    this.albumStoreSubscription = albumStore.subscribe(() => {
      let { albumsDetails } = albumStore.getState();
      let { albumid } = this.state;
      let { error } = albumsDetails;
      if (error) {
        this.setState({ error });
        return;
      }
      let state = {
        loading: albumsDetails.loading
      };
      if (albumsDetails.map[albumid]) {
        state.details = albumsDetails.map[albumid];
        document.title = state.details.title;
      }
      this.setState(state);
    });
    this.setState({
      albumid: params.albumid
    });
    let { albumsDetails } = albumStore.getState();
    let currentAlbumDetails = albumsDetails.map[params.albumid];
    if (currentAlbumDetails) {
      this.setState({ details: currentAlbumDetails });
    } else {
      fetchAlbumDetails(params.albumid);
    }
  }

  componentWillUnmount() {
    if (this.albumStoreSubscription) {
      this.albumStoreSubscription();
    }
  }

  componentDidUpdate() {
    document
      .querySelectorAll(`.image-container`)
      .forEach(entry => {
        this.io.observe(entry);
      });
  }

  io = new IntersectionObserver(entries => {
    let lastElement = 0;
    for (const entry of entries) {
      let id = parseInt(entry.target.getAttribute("id"), 10);
      if (!entry.isIntersecting) {
        entry.target.style.backgroundImage = "";
      } else {
        lastElement = id > lastElement ? id : lastElement;
        entry.target.style.backgroundImage = `url(
          ${entry.target.getAttribute("data-image-src")}
        )`;
      }
    }
    if (lastElement + 1 === this.state.details.photo.length) {
      let { pages, page } = this.state.details;
      page = parseInt(page, 10);
      pages = parseInt(pages, 10);
      this.getPhotos(pages, page + 1);
    }
  });

  getPhotos(pages, nextPage) {
    if (pages > 0 && nextPage > pages) {
      return;
    }
    fetchAlbumDetails(this.state.albumid, nextPage);
  }

  renderContent = () => {
    let noOfPhotos = this.state.details.photo.length - 1;
    return (
      <AlbumsDetailsWrapper>
        <h3>{this.state.details.title}</h3>
        <AvatarSM
          imgUrl="https://i.imgur.com/IY89xWR.jpg"
          name={this.state.details.ownername}
          profileLink={"https://www.flickr.com/photos/130755358@N08/albums"}
        />
        <AlbumDetailsContainer>
          {this.state.details.photo.map((image, i) => {
            let ImgContainer = ImageContainer;
            ImgContainer = i % 4 === 0 ? MediumSizeImage : ImgContainer;
            ImgContainer = i + 6 > noOfPhotos ? LastImage : ImgContainer;
            return (
              <ImgContainer
                key={image.id}
              >
                <Link to={`${this.props.match.url}/photos/${image.id}`}>
                  <div
                    id={i}
                    className="image-container"
                    data-image-src={`${image.url_m}`}
                  />
                </Link>
              </ImgContainer>
            );
          })}
        </AlbumDetailsContainer>
      </AlbumsDetailsWrapper>
    );
  };

  render() {
    if (this.state.error) {
      throw new Error(JSON.stringify(this.state.error, null, 2));
    }
    return [
      <WithLoadingIndicator
        conditionToLoadNewChildren={this.state.loading}
        key="photos"
      >
        {!this.state.details.photo.length ? <span /> : this.renderContent()}
      </WithLoadingIndicator>,
      <Route
        key="photo-view"
        path={`${this.props.match.path}/photos/:photoid`}
        component={Photo}
      />
    ];
  }
}
