import PropTypes from "prop-types";
import React from "react";
import { cardLayoutStyles } from "../../Styles/Theme";
import HRDate from "../HRDate";
import { css } from "glamor";
import { Link } from "react-router-dom";
import IconSVG from "../IconSVG";

const albumDivStyles = css({
  height: "400px",
  display: "flex",
  flexDirection: "column"
});

const albumImageStyles = css({
  backgroundRepeat: "no-repeat",
  padding: "10px",
  backgroundSize: "cover",
  height: "270px"
});

const albumContent = css({
  height: "calc(100% - 270px)",
  paddingTop: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
});

const albumeFooterStyles = css({
  margin: "10px 0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "> span": {
    display: "inline-flex",
    alignItems: "center",
    "> span": {
      margin: "0 10px 0 0"
    }
  }
});

const Album = ({
  id,
  title,
  description,
  date_create,
  primary_photo_extras,
  photos
}) => {
  return (
    <Link className={`${cardLayoutStyles}`} to={`/albums/${id}`}>
      <div className={`${albumDivStyles}`}>
        <div
          className={`${albumImageStyles}`}
          style={{ backgroundImage: `url(${primary_photo_extras.url_s})` }}
        />
        <div className={`${albumContent}`}>
          <h5>{title._content}</h5>
          {description._content.length ? (
            <small> {description._content} </small>
          ) : null}
          <div className={`${albumeFooterStyles}`}>
            <HRDate date={parseInt(date_create, 10) * 1000} />
            <span>
              <span>{photos}</span>
              <IconSVG name="icon-camera" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

Album.propTypes = {
  title: PropTypes.shape({ _content: PropTypes.string }),
  description: PropTypes.shape({ _content: PropTypes.string }),
  date_create: PropTypes.string,
  primary_photo_extras: PropTypes.shape({
    url_s: PropTypes.string,
    height_s: PropTypes.string,
    width_s: PropTypes.string
  }),
  id: PropTypes.string,
  photos: PropTypes.string
};

export default Album;
