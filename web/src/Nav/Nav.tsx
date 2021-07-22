import React, { ReactElement } from "react";
import Navbar from "./Navbar";
import NavItem from "./NavItem";

export default function Nav(): ReactElement {
  const navContents = () => {
    return (
      <>
        <NavItem content="Profile" to="/profile" />
      </>
    );
    console.log("here");

    return (
      <>
        <NavItem content="Login" to="/login" />
        <NavItem content="Sign Up" to="/signup" />
      </>
    );
  };

  return <Navbar>{navContents()}</Navbar>;
}
