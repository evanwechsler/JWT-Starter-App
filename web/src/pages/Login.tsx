import React, { ReactElement, useRef, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useLoginMutation(loginOptions(history));
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await loginUser(login, email, password);
    console.log(response);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            placeholder="Password"
            onChange={handlePasswordChange}
            required
          />
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
