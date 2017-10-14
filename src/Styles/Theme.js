import { css, media, hover } from "glamor";

const COLORS = {
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
  white: "white"
};

export const theme = {
  main: {
    colors: COLORS,
    pre: {
      backgroundColor: COLORS.purple,
      padding: "20px",
      border: `10px solid ${COLORS.red}`
    },
    borderRadius: "4px",
    boxShadow: (color = COLORS.red) => `1px 1px 1px 1px ${color}`
  }
};

const paddingBetweenCards = 20;

export const cardLayoutParent = css({
  display: "flex",
  padding: "10px",
  flexWrap: "wrap",
  width: "100%"
});

export const cardLayoutStyles = css(
  {
    border: `1px solid ${theme.main.colors.tollerantPink}`,
    width: `calc((100% - ${paddingBetweenCards * 3}px) / 3)`,
    minHeight: "100px",
    padding: "10px",
    borderRadius: "4px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: theme.main.boxShadow(theme.main.colors.orange),
    wordWrap: "break-word",
    ":hover": {
      textDecoration: "none",
      boxShadow: `0px 0px 10px 2px ${theme.main.colors.orange}`
    },
    ...headingLinkStyles
  },
  media("(max-width: 768px)", {
    width: `calc((100% - ${paddingBetweenCards}px) / 1)`
  }),
  media("(min-width: 769px) and (max-width: 1000px)", {
    width: `calc((100% - ${paddingBetweenCards * 2}px) / 2)`
  })
);

export const headingLinkStyles = css({
  color: theme.main.colors.brightBlue,
  textDecoration: "none"
});

export const newTabLinkStyles = css({
  "& small": {
    margin: "0 5px"
  }
});

const spinAnimation = css.keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(359deg)"
  }
});

export const spin = css({
  animation: `${spinAnimation} 1s infinite`
});

export const buttonStyles = css({
  border: `1px solid ${COLORS.tollerantPink}`,
  boxShadow: `1px 1px 1px 1px ${COLORS.orange}`,
  transition: "ease-in box-shadown",
  ":active": {
    boxShadow: `inset ${theme.main.boxShadow(COLORS.orange)} !important`,
    outline: "none"
  },
  ":focus": {
    outline: "none"
  },
  "[disabled]": {
    cursor: "not-allowed"
  }
});

css.global("html, body", {
  backgroundColor: `${theme.main.colors.gray}`,
  fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`
});
css.global("pre", theme.main.pre);
css.global(
  "a",
  {},
  hover({
    textDecoration: "none"
  })
);
css.global("p", {
  marginBottom: "2rem"
});
css.global(
  "ul",
  {},
  css({
    "> p": {
      margin: "0"
    }
  }),
  css({
    "> li": {
      margin: "10px 0",
      "> p": {
        margin: "0"
      }
    }
  })
);
css.global("h3, h4, h5", {
  borderBottom: "1px solid",
  paddingBottom: "10px",
  fontWeight: "bold"
});

export const headerHeight = 60;

const invalidReponseStyles = css({
  height: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "> .icon-svg": {
    fontSize: "10rem"
  },
  "> h1": {
    fontSize: "15rem"
  },
  "> pre": {
    width: "100%",
    color: COLORS.red,
    backgroundColor: COLORS.lightenPurple
  }
});

export { invalidReponseStyles };
