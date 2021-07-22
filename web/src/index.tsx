import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  Observable,
  from,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { cache } from "./cache";
import { onError } from "@apollo/client/link/error";
import { AccessToken, getAccessToken, setAccessToken } from "./accessToken";
import App from "./App";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import "./styles/index.scss";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Set authentication header if logged in
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode<AccessToken>(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client = new ApolloClient<NormalizedCacheObject>({
  link: from([tokenRefreshLink, requestLink, errorLink, httpLink]),
  cache,
  typeDefs,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
