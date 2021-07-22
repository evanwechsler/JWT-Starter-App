import React, { ReactElement } from "react";
import CircleSpinner from "../components/CircleSpinner";
import LogoutButton from "../components/LogoutButton";
import { useMeQuery } from "../generated/graphql";
import { ApolloError } from "@apollo/client";
import "../styles/dashboard.scss";
import { useHistory } from "react-router-dom";

export default function Dashboard(): ReactElement {
  const history = useHistory();
  const { data, loading } = useMeQuery({
    onError: (err: ApolloError) => {
      console.log(err);
      history.push("/login");
    },
  });
  const spinnerColor = "#1877f2";
  return (
    <div className="container center">
      <div className="card">
        {loading && <CircleSpinner color={spinnerColor} />}
        {data?.me && (
          <div>
            <h1>Email: {data.me.email}</h1>
            <h3>User Id: {data.me.id}</h3>
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
}
