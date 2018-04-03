import PropTypes from "prop-types";
import React, { Component } from "react";
import IconSVG from "../IconSVG";
import {
  ShortCardWrapper,
  ShortCard,
} from "../../Styles/Main/components";
import {colors} from '../../Styles/Main/variables';

const SocialIcon = ShortCard.extend`
  font-size: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
  :hover {
    background-color: ${props => props.color};
    color: white;
  }
`;
const SocialIconLink = SocialIcon.withComponent('a');
const CardedIcons = ({ name, color, url, ...props }) => {
  return (
    <SocialIconLink
      href={url}
      target="_blank"
      color={color}
    >
      <IconSVG name={name} {...props} />
    </SocialIconLink>
  );
};

CardedIcons.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string
};

const profiles = [
  {
    iconName: "icon-twitter",
    color: colors.twitterBlue,
    url: "https://twitter.com/ajainarayanan"
  },
  {
    iconName: "icon-github-profile",
    color: 'black',
    url: "https://github.com/ajainarayanan"
  },
  {
    iconName: "icon-stackoverflow",
    color: colors.stackOverflowOrange,
    url: "https://stackoverflow.com/users/661768/ajai"
  },
  {
    iconName: "icon-facebook",
    color: colors.facebookBlue,
    url: "https://www.facebook.com/ajai.narayanan"
  },
  {
    iconName: "icon-google-plus",
    color: colors.googlePlusRed,
    url: "https://plus.google.com/u/0/+ajainarayanan"
  },
  {
    iconName: "icon-linkedin",
    color: colors.linkedInBlue,
    url: "https://www.linkedin.com/in/ajai-narayanan/"
  },
  {
    iconName: "icon-flickr",
    color: colors.flickrPink,
    url: "https://www.flickr.com/people/130755358@N08/"
  }
];
export default class Social extends Component {
  state = {
    isOpen: false
  };
  render() {
    return (
      <ShortCardWrapper>
        {profiles.map(profile => (
          <CardedIcons
            name={profile.iconName}
            key={profile.iconName}
            url={profile.url}
            color={profile.color}
          />
        ))}
      </ShortCardWrapper>
    );
  }
}
