import PropTypes from "prop-types";
import React, { createElement } from "react";
import marksy from "marksy";
import prism from "prismjs";
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  margin: 30px 0;
`;

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
        const ImgContainer = styled.img`
          max-width: 100%;
          width: ${alt === "CoverPhoto" ? '100%' : null}
        `;
        return <ImgContainer src={src} alt={alt} />;
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
  return <MarkdownContainer>{compiled.tree}</MarkdownContainer>;
}

Markdown.propTypes = {
  markdown: PropTypes.string
};
