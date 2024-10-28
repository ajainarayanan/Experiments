import React from "react";
import IcongSVG from "../IconSVG";
import { InvalidResponse } from "../../Styles/Main/components";

/*
  Right now this is not used. FIXME! 
*/
export default function Page403() {
  return (
    <InvalidResponse>
      <IcongSVG name="icon-evil" />
      <h1>403</h1>
      <h2> Access Denied </h2>
    </InvalidResponse>
  );
}
