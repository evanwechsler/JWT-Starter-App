import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "../styles/home.scss";

export default function Home(): ReactElement {
  return (
    <div className="container center">
      <div className="home">
        <Link to="login">Login</Link>
        <Link to="signup">Sign Up</Link>
      </div>
    </div>
  );
}
