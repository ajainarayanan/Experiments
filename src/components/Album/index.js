import PropTypes from "prop-types";
import React from "react";
import { Card, FlexColumnStyles } from "../../Styles/Main/components";
import HRDate from "../HRDate";
import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";
import IconSVG from "../IconSVG";

const HEIGHT_OF_IMAGE = 270;
const FlexColumbFullHeight = css`
  ${FlexColumnStyles}
  height: 100%;
`;
const AlbumWrapper = styled.div`
  ${FlexColumbFullHeight}
`;
const AlbumImage = styled.img`
  background-repeat: no-repeat;
  background-size: cover;
  height: ${HEIGHT_OF_IMAGE}px;
  background-image: ${props => `url(${props.imageUrl})`}
`;

const AlbumContent = styled.div`
  height: calc(100% - ${HEIGHT_OF_IMAGE}px);
  padding-top: 10px;
  ${FlexColumnStyles}
`;
const AlbumFooterWrapper = styled.div`
  ${FlexColumbFullHeight}
`;

const AlbumFooter = styled.div`
  margin: 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    display: inline-flex;
    align-items: center;
    > span {
      margin: 0 10px 0 0;
    }
  }
`;

const LinkCard = Card.withComponent(Link);

const Album = ({
  id,
  title,
  description,
  date_create,
  primary_photo_extras,
  photos
}) => {
  return (
    <LinkCard to={`/albums/${id}`}>
      <AlbumWrapper>
        <AlbumImage
          imageUrl={primary_photo_extras.url_s}
        />
        <AlbumContent>
          <h5>{title._content}</h5>
          <AlbumFooterWrapper>
            {
              description._content.length ? (
                <small> {description._content} </small>
              ) : <i><small>No description available</small></i>
            }
            <AlbumFooter>
              <HRDate date={parseInt(date_create, 10) * 1000} />
              <span>
                <span>{photos}</span>
                <IconSVG name="icon-camera" />
              </span>
            </AlbumFooter>
          </AlbumFooterWrapper>
        </AlbumContent>
      </AlbumWrapper>
    </LinkCard>
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
  photos: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Album;
