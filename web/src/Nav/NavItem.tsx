import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  content: React.ReactChild;
  to: string;
}

export default function NavItem({ content, to }: Props): ReactElement {
  const isIcon = () => {
    if (typeof content === "string" || typeof content === "number") {
      return false;
    }
    return true;
  };
  return (
    <li className="nav-item">
      <Link to={to} className={isIcon() ? "icon-link" : "text-link"}>
        {content}
      </Link>
    </li>
  );
}
