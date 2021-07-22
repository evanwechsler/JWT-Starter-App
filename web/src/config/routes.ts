import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import React from "react";

interface Route {
  path: string;
  component: React.ElementType;
  isPrivate?: boolean;
  exact?: boolean;
}

const routes: Route[] = [
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/dashboard", component: Dashboard, isPrivate: true },
  { path: "/", component: Home, exact: true },
  { path: "/*", component: PageNotFound, isPrivate: true },
];

export default routes;
