import PropTypes from "prop-types";
import React, { Component } from "react";
import LoadingIndicator, { WithLoadingIndicator } from "../LoadingIndicator";
import { fetchAlbumDetails } from "../Albums/store/ActionCreator";
import { theme } from "../../Styles/Theme";
import { css, hover, media } from "glamor";
import AvatarSM from "../AvatarSM";
import { Link, Route } from "react-router-dom";
import { albumStore } from "../Albums/store";
import Loadable from "react-loadable";

if (typeof IntersectionObserver === "undefined") {
  require("intersection-observer");
}
const Photo = Loadable({
  loader: () => import(/* webpackChunkName: "Photo" */ "../Photo"),
  loading: LoadingIndicator
});
const albumDetailsContainerStyles = css({
  padding: "10px 30px"
});

const albumContainerStyles = css({
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gridAutoRows: "200px",
  gridAutoFlow: "row dense",
  marginTop: "20px"
});
const imgContainerStyles = css(
  {
    position: "relative",
    cursor: "pointer",
    boxShadow: theme.main.boxShadow(theme.main.colors.orange),
    border: `1px solid ${theme.main.colors.tollerantPink}`,
    transition: "transform  0.3s ease-in-out",
    borderRadius: theme.main.borderRadius,
    padding: "10px",
    "& .image-container": {
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
  },
  hover({
    boxShadow: `0px 0px 10px 2px ${theme.main.colors.orange}`
  })
);
const imgMediumContainer = css(
  {
    gridRow: "span 3"
  },
  media("(max-width: 768px)", {
    gridRow: "span 1"
  })
);
const lastImageStyles = css(
  {
    gridColumn: "span 1",
    gridRow: "span 1"
  },
  media("(max-width: 768px)", {
    gridRow: "span 1",
    gridColumn: "span 1"
  })
);
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
      .querySelectorAll(`.${imgContainerStyles.toString()} .image-container`)
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
      <div className={`album-detail-container ${albumDetailsContainerStyles}`}>
        <h3>{this.state.details.title}</h3>
        <AvatarSM
          imgUrl="https://i.imgur.com/IY89xWR.jpg"
          name={this.state.details.ownername}
          profileLink={"https://www.flickr.com/photos/130755358@N08/albums"}
        />
        <div className={`${albumContainerStyles}`}>
          {this.state.details.photo.map((image, i) => {
            let mediumStyle = i % 4 === 0 ? imgMediumContainer : "";
            let lastElementStyle = i + 6 > noOfPhotos ? lastImageStyles : "";
            return (
              <div
                key={image.id}
                className={`${imgContainerStyles} ${mediumStyle} ${lastElementStyle}`}
              >
                <Link to={`${this.props.match.url}/photos/${image.id}`}>
                  <div
                    id={i}
                    className="image-container"
                    data-image-src={`${image.url_m}`}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
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
