import React from "react";
import IcongSVG from "../IconSVG";
import { invalidReponseStyles } from "../../Styles/Theme";

export default function Page500() {
  return (
    <div className={`${invalidReponseStyles}`}>
      <IcongSVG name="icon-wondering" />
      <h1>500</h1>
      <h2> Sorry something went wrong </h2>
    </div>
  );
}
