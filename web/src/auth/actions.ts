import { setAccessToken } from "../accessToken";
import { isLoggedInVar } from "../cache";
import {
  Exact,
  LoginMutation,
  LoginResponse,
  LogoutMutation,
  MeDocument,
  MeQuery,
  User,
} from "../generated/graphql";
import { ApolloError, ApolloClient } from "@apollo/client";
import { History, LocationState } from "history";
import { MutationFunctionOptions, FetchResult } from "@apollo/client";

export const loginOptions = (history: History<LocationState>) => ({
  onCompleted({
    login,
  }: {
    login: {
      __typename?: "LoginResponse" | undefined;
    } & Pick<LoginResponse, "accessToken"> & {
        user: {
          __typename?: "User" | undefined;
        } & Pick<User, "id" | "email">;
      };
  }) {
    if (login) {
      localStorage.setItem("userId", login.user.id.toString());
      setAccessToken(login.accessToken);
      isLoggedInVar(true);
      history.push("/dashboard");
    }
  },
  onError: (err: ApolloError) => {
    console.log(err);
  },
});

export const loginUser = async (
  login: (
    options?:
      | MutationFunctionOptions<
          LoginMutation,
          Exact<{
            email: string;
            password: string;
          }>
        >
      | undefined
  ) => Promise<
    FetchResult<
      LoginMutation,
      Record<"user", { id: number }>,
      Record<"accessToken", string>
    >
  >,
  email: string,
  password: string
) => {
  const response = await login({
    variables: {
      email,
      password,
    },
    update: (store, { data }) => {
      if (!data) {
        return null;
      }
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: data.login.user,
        },
      });
    },
  });
  console.log(response);
};

export const logoutUser = async (
  logout: (
    options?:
      | MutationFunctionOptions<
          LogoutMutation,
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<FetchResult<LogoutMutation>>,
  client: ApolloClient<object>,
  history: History<LocationState>
) => {
  await logout();
  client.cache.evict({ fieldName: "me" });
  client.cache.gc();
  setAccessToken("");
  localStorage.removeItem("userId");
  isLoggedInVar(false);
  history.push("/login");
};
