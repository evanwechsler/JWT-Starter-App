import React, { ReactElement, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

export default function Login({ history }: RouteComponentProps): ReactElement {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [login] = useLoginMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    let email = emailRef.current?.value,
      password = passwordRef.current?.value;
    if (!email && !password) {
      setError("You must include an email and password");
      return;
    }
    console.log("form submitted");
    email = email as string;
    password = password as string;
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
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && error}
      <div>
        <input placeholder="email" type="email" ref={emailRef} />
      </div>
      <div>
        <input placeholder="password" type="password" ref={passwordRef} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
