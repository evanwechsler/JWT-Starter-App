import React, { ReactElement } from "react";

interface Props {
  children?: React.ReactNode;
}

export default function Navbar({ children }: Props): ReactElement {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
}
