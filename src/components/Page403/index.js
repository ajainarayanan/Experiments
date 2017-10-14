import React from "react";
import IcongSVG from "../IconSVG";
import { invalidReponseStyles } from "../../Styles/Theme";

export default function Page403() {
  return (
    <div className={`${invalidReponseStyles}`}>
      <IcongSVG name="icon-evil" />
      <h1>403</h1>
      <h2> Access Denied </h2>
    </div>
  );
}
