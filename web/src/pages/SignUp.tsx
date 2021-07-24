import React, { ReactElement, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DotSpinner from "../components/DotSpinner";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import "../styles/signin.scss";
import { loginOptions, loginUser, signUpUser } from "../auth";
import Isemail from "isemail";
import SignUpPasswordField from "../components/SignUpPasswordField";

export default function SignUp(): ReactElement {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", valid: false });
  const [error, setError] = useState("");

  const [register, { loading: loadingSignUp, error: signUpError }] =
    useRegisterMutation();
  const [login, { loading: loadingLogin, error: loginError }] =
    useLoginMutation(loginOptions(history));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();

    const isValidEmail = Isemail.validate(email, { errorLevel: false });
    if (!isValidEmail) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password.valid) {
      setError("Please enter a valid password");
      return;
    }
    let response: any = await signUpUser(register, email, password.value);

    console.log(`Sign up: ${response}`);
    response = await loginUser(login, email, password.value);
    console.log(response);
    setError("");
  };

  return (
    <div className="container center">
      <div className="card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {(loginError || signUpError || error) && (
            <p className="error">
              {loginError?.message || signUpError?.message || error}
            </p>
          )}

          <input
            className="text"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SignUpPasswordField setPassword={setPassword} />
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
