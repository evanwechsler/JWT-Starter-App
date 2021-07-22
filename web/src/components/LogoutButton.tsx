import React, { ReactElement } from "react";
import { useLogoutMutation } from "../generated/graphql";
import { logoutUser } from "../auth";
import { useHistory } from "react-router-dom";
import { LocationState } from "history";

export default function LogoutButton(): ReactElement {
  const [logout, { client }] = useLogoutMutation();
  const history = useHistory<LocationState>();
  const handleClick = async (e: React.MouseEvent) => {
    logoutUser(logout, client, history);
  };
  return <button onClick={handleClick}>Logout</button>;
}
