import React, { ReactElement, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useLoginMutation } from "../generated/graphql";
import "../styles/signin.scss";
import DotSpinner from "../components/DotSpinner";
import PasswordInput from "../components/PasswordInput";
import { LocationState } from "history";
import { loginOptions, loginUser } from "../auth";

export default function Login(): ReactElement {
  const history = useHistory<LocationState>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [login, { loading, error }] = useLoginMutation(loginOptions(history));
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value,
        password = passwordRef.current.value;

      const response = await loginUser(login, email, password);
      console.log(response);
    }
  };

  return (
    <div className="container center">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error.message}</div>}
          <input
            className="text"
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          />
          <PasswordInput placeholder="Password" ref={passwordRef} required />
          <button type="submit" disabled={loading}>
            {loading ? <DotSpinner color="white" size="14px" /> : "Login"}
          </button>
        </form>
        <div className="hr"></div>
        <button
          id="create-account"
          onClick={() => history.push("signup")}
          disabled={loading}
        >
          Create an account
        </button>
      </div>
    </div>
  );
}
