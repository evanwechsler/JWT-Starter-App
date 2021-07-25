import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
interface Props {
  component: React.ElementType;
  path: string;
  isPrivate?: boolean;
  exact?: boolean;
}

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function AppRoute({
  component: Component,
  path,
  isPrivate,
  exact,
}: Props): ReactElement {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !data.isLoggedIn ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      exact={exact}
    />
  );
}
