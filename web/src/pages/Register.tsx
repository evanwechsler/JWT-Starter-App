import React, { ReactElement, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

export default function Register({
  history,
}: RouteComponentProps): ReactElement {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [register] = useRegisterMutation();
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
    const response = await register({
      variables: {
        email,
        password,
      },
    });
    console.log(response);
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
      <button type="submit">Register</button>
    </form>
  );
}
