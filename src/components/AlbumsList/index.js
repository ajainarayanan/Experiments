import PropTypes from "prop-types";
import React from "react";
import { WithLoadingIndicator } from "../LoadingIndicator";
import { connect } from "react-redux";
import { CardWrapper } from "../../Styles/Main/components";
import Album from "../Album";

function AlbumsList({ loading, albums }) {
  return (
    <WithLoadingIndicator condition={loading}>
      <CardWrapper>
        {albums.map(album => <Album key={album.id} {...album} />)}
      </CardWrapper>
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
