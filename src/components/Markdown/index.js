import PropTypes from "prop-types";
import React, { createElement } from "react";
import marksy from "marksy";
import prism from "prismjs";
import { css } from "glamor";

const markdownContainerStyles = css({
  margin: "30px 0"
});

export default function Markdown({ markdown }) {
  let compile = marksy({
    createElement,
    highlight(language, code) {
      if (!prism.languages[language]) {
        return code;
      }
      return prism.highlight(code, prism.languages[language]);
    },
    elements: {
      /* eslint-disable react/prop-types */
      img({ src, alt }) {
        let imgStyles = { maxWidth: "100%" };
        if (alt === "CoverPhoto") {
          imgStyles.width = "100%";
        }
        imgStyles = css(imgStyles);
        return <img className={imgStyles} src={src} alt={alt} />;
      },
      h1({ id, children }) {
        return <h3 id={id}>{children}</h3>;
      },
      h2({ id, children }) {
        return <h4 id={id}>{children}</h4>;
      }
    }
  });
  const compiled = compile(markdown);
  return <div className={`${markdownContainerStyles}`}>{compiled.tree}</div>;
}

Markdown.propTypes = {
  markdown: PropTypes.string
};
