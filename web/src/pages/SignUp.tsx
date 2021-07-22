import React, { ReactElement, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import DotSpinner from "../components/DotSpinner";
import PasswordInput from "../components/PasswordInput";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import "../styles/signin.scss";
import { loginOptions, loginUser } from "../auth";

export default function SignUp(): ReactElement {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [register, { loading: loadingSignUp, error: signUpError }] =
    useRegisterMutation();
  const [login, { loading: loadingLogin, error: loginError }] =
    useLoginMutation(loginOptions(history));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value,
        password = passwordRef.current.value;

      let response: any = await register({
        variables: {
          email,
          password,
        },
      });

      console.log(response);
      response = await loginUser(login, email, password);
      console.log(response);
    }
  };

  return (
    <div className="container center">
      <div className="card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {loginError ||
            (signUpError && (
              <p className="error">{loginError || signUpError}</p>
            ))}

          <input
            className="text"
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          />
          <PasswordInput placeholder="Password" ref={passwordRef} required />
          <button type="submit" disabled={loadingSignUp || loadingLogin}>
            {loadingSignUp || loadingLogin ? (
              <DotSpinner color="white" size="14px" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}
