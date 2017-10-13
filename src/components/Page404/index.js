import React from "react";
import IcongSVG from "../IconSVG";
import { css } from "glamor";

const page404Styles = css({
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
  }
});

export default function Page404() {
  return (
    <div className={`${page404Styles}`}>
      <IcongSVG name="icon-baffled" />
      <h1>404</h1>
      <h2> Page Not Found </h2>
    </div>
  );
}
