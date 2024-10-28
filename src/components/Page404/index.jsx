import React from "react";
import IcongSVG from "../IconSVG";
import { InvalidResponse } from "../../Styles/Main/components";

export default function Page404() {
  return (
    <InvalidResponse>
      <IcongSVG name="icon-baffled" />
      <h1>404</h1>
      <h2> Page Not Found </h2>
    </InvalidResponse>
  );
}
