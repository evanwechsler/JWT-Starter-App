import React, { ReactElement, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DotSpinner from "../components/DotSpinner";
import PasswordInput from "../components/PasswordInput";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import "../styles/signin.scss";
import { loginOptions, loginUser, signUpUser } from "../auth";
import PasswordValidationMessages from "../components/PasswordValidationMessages";
import Isemail from "isemail";
import {
  PasswordMessages,
  PasswordValidation,
  PasswordValidator,
} from "../auth/validators/passwordValidator";

export default function SignUp(): ReactElement {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);

  const passwordValidator = new PasswordValidator();
  const messages = passwordValidator.getMessages();
  const [passwordValidationStatus, setPasswordValidationStatus] = useState<{
    passwordValidation: PasswordValidation;
    messages: PasswordMessages;
  }>({
    passwordValidation: { validated: false, passwordLevels: {} },
    messages,
  });

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

    if (!passwordValidationStatus.passwordValidation.validated) {
      setError("Please enter a valid password");
      return;
    }
    let response: any = await signUpUser(register, email, password);

    console.log(`Sign up: ${response}`);
    response = await loginUser(login, email, password);
    console.log(response);
    setError("");
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const curPassword = e.currentTarget.value;
    const curPasswordValidation =
      passwordValidator.validatePassword(curPassword);
    setPassword(curPassword);
    setPasswordValidationStatus({
      ...passwordValidationStatus,
      passwordValidation: curPasswordValidation,
    });
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
          <PasswordInput
            placeholder="Password"
            onChange={handlePasswordChange}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            required
          />
          {passwordFocus && (
            <PasswordValidationMessages
              messages={passwordValidationStatus.messages}
              validated={
                passwordValidationStatus.passwordValidation.passwordLevels
              }
            />
          )}
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
