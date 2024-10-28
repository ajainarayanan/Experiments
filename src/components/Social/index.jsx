import PropTypes from "prop-types";
import React, { Component } from "react";
import IconSVGWrapper from "../IconSVG";
import {
  ShortCardWrapper,
  ShortCard,
} from "../../Styles/Main/components";
import {colors} from '../../Styles/Main/variables';
import IconTwitter from '../../images/icontwitter.svg?react';
import IconGithub from '../../images/icongithub.svg?react';
import IconStackoverflow from '../../images/iconstackoverflow.svg?react';
import IconFacebook from '../../images/iconfacebook.svg?react';
import IconGoogleplus from '../../images/icongoogleplus.svg?react';
import IconLinkedin from '../../images/iconlinkedin.svg?react';
import IconFlickr from '../../images/iconflickr.svg?react';

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
const CardedIcons = ({ name, color, url, icon , ...props }) => {
  return (
    <SocialIconLink
      href={url}
      target="_blank"
      color={color}
    >
      <IconSVGWrapper {...props}> {icon} </IconSVGWrapper>
    </SocialIconLink>
  );
};

CardedIcons.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.element,
};

const profiles = [
  {
    icon: <IconTwitter />,
    color: colors.twitterBlue,
    url: "https://twitter.com/ajainarayanan"
  },
  {
    icon: <IconGithub />,
    color: 'black',
    url: "https://github.com/ajainarayanan"
  },
  {
    icon: <IconStackoverflow />,
    color: colors.stackOverflowOrange,
    url: "https://stackoverflow.com/users/661768/ajai"
  },
  {
    icon: <IconFacebook />,
    color: colors.facebookBlue,
    url: "https://www.facebook.com/ajai.narayanan"
  },
  {
    icon: <IconGoogleplus />,
    color: colors.googlePlusRed,
    url: "https://plus.google.com/u/0/+ajainarayanan"
  },
  {
    icon: <IconLinkedin />,
    color: colors.linkedInBlue,
    url: "https://www.linkedin.com/in/ajai-narayanan/"
  },
  {
    icon: <IconFlickr />,
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
            key={profile.url}
            url={profile.url}
            color={profile.color}
            icon={profile.icon}
          />
        ))}
      </ShortCardWrapper>
    );
  }
}
