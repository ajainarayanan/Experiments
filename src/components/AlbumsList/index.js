import PropTypes from "prop-types";
import React from "react";
import { WithLoadingIndicator } from "../LoadingIndicator";
import { connect } from "react-redux";
import { cardLayoutParent } from "../../Styles/Theme";
import Album from "../Album";

function AlbumsList({ loading, albums }) {
  return (
    <WithLoadingIndicator condition={loading}>
      <div className={`albums-list-container ${cardLayoutParent}`}>
        {albums.map(album => <Album key={album.id} {...album} />)}
      </div>
    </WithLoadingIndicator>
  );
}

AlbumsList.propTypes = {
  loading: PropTypes.bool,
  albums: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => {
  return {
    loading: state.albums.loading,
    albums: state.albums.list
  };
};

const AlbumsListWrapper = connect(mapStateToProps)(AlbumsList);

export default AlbumsListWrapper;
