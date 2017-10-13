import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
import { theme } from "../../Styles/Theme";

const avatarStyles = css({
  display: "inline-flex",
  background: theme.main.colors.red,
  flexDirection: "row",
  lineHeight: "1",
  alignItems: "center",
  border: `1px solid ${theme.main.colors.saturatedPink}`,
  color: theme.main.colors.white,
  borderRadius: theme.main.borderRadius,
  paddingRight: "5px",
  textDecoration: "none",
  fontStyle: "normal",
  ":hover": {
    textDecoration: "none",
    color: theme.main.colors.sickPink
  }
});

const avatar_mini_styles = css({
  width: "20px",
  borderRadius: theme.main.borderRadius,
  marginRight: "5px",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0"
});

export default function AvatarSM({ name, imgUrl, profileLink }) {
  return (
    <a className={`${avatarStyles}`} href={profileLink} target="_blank">
      <img className={`${avatar_mini_styles}`} src={imgUrl} alt={name} />
      <small>{name}</small>
    </a>
  );
}

AvatarSM.propTypes = {
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  profileLink: PropTypes.string
};
