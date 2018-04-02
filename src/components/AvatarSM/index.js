import React from "react";
import PropTypes from "prop-types";
import {colors, borderRadius} from "../../Styles/Main/variables";
import styled from 'styled-components';

const AvatarLink = styled.a`
  display: inline-flex;
  background: ${colors.red};
  flex-direction: row;
  line-height: 1;
  align-items: center;
  border: 1px solid ${colors.saturatedPink};
  color: ${colors.white};
  border-radius: ${borderRadius}px;
  padding-right: 5px;
  text-decoration: none;
  font-style: normal;
  &:hover {
    text-decoration: none;
    color: ${colors.sickPink};
  }
`;

const AvaterImg = styled.img`
  width: 20px;
  border-radius: ${borderRadius};
  margin-right: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export default function AvatarSM({ name, imgUrl, profileLink }) {
  return (
    <AvatarLink href={profileLink} target="_blank">
      <AvaterImg src={imgUrl} alt={name} />
      <small>{name}</small>
    </AvatarLink>
  );
}

AvatarSM.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  profileLink: PropTypes.string
};
