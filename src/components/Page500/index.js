import React from "react";
import IcongSVG from "../IconSVG";
import { InvalidResponse } from "../../Styles/Main/components";

export default function Page500() {
  return (
    <InvalidResponse>
      <IcongSVG name="icon-wondering" />
      <h1>500</h1>
      <h2> Sorry something went wrong </h2>
    </InvalidResponse>
  );
}
