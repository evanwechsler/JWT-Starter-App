import React, { ReactElement } from "react";
import {
  Redirect,
  Route,
  RouteChildrenProps,
  RouteComponentProps,
} from "react-router-dom";

interface Props {
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?:
    | ((props: RouteChildrenProps<any>) => React.ReactNode)
    | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}

export default function PrivateRoute(props: Props): ReactElement {
  return (
    <Route exact={props.exact} path={props.path} component={props.component} />
  );
}
