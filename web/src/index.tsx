import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: cache,
  credentials: "include",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
