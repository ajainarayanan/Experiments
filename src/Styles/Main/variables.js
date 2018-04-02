const colors = {
  gray: "#E3E3E3",
  brightBlue: "#7387DD",
  lightBlue: "#BAD6FC",
  purple: "#32213A",
  lightenPurple: "rgba(50, 33, 58, 0.5)",
  yellow: "#FCF180",
  tollerantPink: "#CE4040",
  saturatedPink: "#AA5D5D",
  sickPink: "#C48787",
  red: "#8C1313",
  orange: "#DD4816",
  white: "white",
  twitterBlue: "#1da1f2",
  facebookBlue: "#3b5998",
  googlePlusRed: "#dd4b39",
  linkedInBlue: "#0077B5",
  redditBlue: "#cee3f8",
  stackOverflowOrange: "#F48024",
  flickrPink: "#ff0084"
};

const headerHeight = 60;
const paddingBetweenCards = 20;
const boxShadow = (color = colors.red) => `1px 1px 1px 1px ${color}`;
const borderRadius = 4;
export {
  colors,
  headerHeight,
  paddingBetweenCards,
  boxShadow,
  borderRadius
};
