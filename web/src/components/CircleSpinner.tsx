import React, { ReactElement } from "react";
import "../styles/circleSpinner.scss";
interface Props {
  color?: string;
  size?: string;
}

export default function CircleSpinner({ color, size }: Props): ReactElement {
  document.documentElement.style.setProperty("--size", size ?? "40px");
  document.documentElement.style.setProperty("--color", color ?? "white");
  return (
    <div className="sk-chase">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );
}
