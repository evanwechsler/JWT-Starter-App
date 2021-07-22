import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import routes from "../config/routes";
import AppRoute from "./AppRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <div>
        {/* {user ? <Nav /> : null} */}
        <Switch>
          {routes.map((route) => (
            <AppRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              exact={route.exact}
            />
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
}
