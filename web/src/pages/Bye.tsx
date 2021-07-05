import React, { ReactElement } from "react";
import { useByeQuery } from "../generated/graphql";

export default function Bye(): ReactElement {
  const { data, loading, error } = useByeQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return <div>{data.bye}</div>;
}
