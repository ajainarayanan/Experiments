import PropTypes from "prop-types";
import React, { Component } from "react";
import IconSVG from "../IconSVG";
import { css } from "glamor";
import {
  cardLayoutParent,
  theme,
  cardLayoutStyles,
  shortCardLayout
} from "../../Styles/Theme";

const socialIconStyles = color =>
  css({
    fontSize: "4.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "black",
    ":hover": {
      backgroundColor: color,
      color: "white"
    }
  });

const CardedIcons = ({ name, className, url, ...props }) => {
  return (
    <a
      href={url}
      target="_blank"
      className={`${cardLayoutStyles} ${shortCardLayout} ${className}`}
    >
      <IconSVG name={name} {...props} />
    </a>
  );
};

CardedIcons.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  url: PropTypes.string
};

const profiles = [
  {
    iconName: "icon-twitter",
    className: `${socialIconStyles(theme.main.colors.twitterBlue)}`,
    url: "https://twitter.com/ajainarayanan"
  },
  {
    iconName: "icon-github-profile",
    className: `${socialIconStyles("black")}`,
    url: "https://github.com/ajainarayanan"
  },
  {
    iconName: "icon-stackoverflow",
    className: `${socialIconStyles(theme.main.colors.stackOverflowOrange)}`,
    url: "https://stackoverflow.com/users/661768/ajai"
  },
  {
    iconName: "icon-facebook",
    className: `${socialIconStyles(theme.main.colors.facebookBlue)}`,
    url: "https://www.facebook.com/ajai.narayanan"
  },
  {
    iconName: "icon-google-plus",
    className: `${socialIconStyles(theme.main.colors.googlePlusRed)}`,
    url: "https://plus.google.com/u/0/+ajainarayanan"
  },
  {
    iconName: "icon-linkedin",
    className: `${socialIconStyles(theme.main.colors.linkedInBlue)}`,
    url: "https://www.linkedin.com/in/ajai-narayanan/"
  },
  {
    iconName: "icon-flickr",
    className: `${socialIconStyles(theme.main.colors.flickrPink)}`,
    url: "https://www.flickr.com/people/130755358@N08/"
  }
];
export default class Social extends Component {
  state = {
    isOpen: false
  };
  render() {
    return (
      <div className={`${cardLayoutParent}`}>
        {profiles.map(profile => (
          <CardedIcons
            name={profile.iconName}
            key={profile.iconName}
            url={profile.url}
            className={profile.className}
          />
        ))}
      </div>
    );
  }
}
