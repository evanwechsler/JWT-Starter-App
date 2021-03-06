import React, { ReactElement, useEffect } from "react";
import "../styles/dotSpinner.scss";
interface Props {
  color?: string;
  size?: string;
}

export default function DotSpinner({ color, size }: Props): ReactElement {
  useEffect(() => {
    const dots = Array.from(
      document.querySelectorAll("div.spinner > div") as NodeListOf<HTMLElement>
    );
    for (let dot of dots) {
      dot.style.backgroundColor = color ?? "white";
      dot.style.width = size ?? "14px";
      dot.style.height = size ?? "14px";
    }
  }, [color, size]);

  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}
