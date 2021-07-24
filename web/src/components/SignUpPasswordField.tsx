import React, { ReactElement, useState } from "react";
import {
  PasswordMessages,
  PasswordValidation,
  PasswordValidator,
} from "../auth/validators/passwordValidator";
import PasswordInput from "./PasswordInput";
import PasswordValidationMessages from "./PasswordValidationMessages";

interface Props {
  setPassword: React.Dispatch<
    React.SetStateAction<{
      value: string;
      valid: boolean;
    }>
  >;
}

export default function SignUpPasswordField({
  setPassword,
}: Props): ReactElement {
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

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const curPassword = e.currentTarget.value;
    const curPasswordValidation =
      passwordValidator.validatePassword(curPassword);
    setPassword({ value: curPassword, valid: curPasswordValidation.validated });
    setPasswordValidationStatus({
      ...passwordValidationStatus,
      passwordValidation: curPasswordValidation,
    });
  };
  return (
    <>
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
          validated={passwordValidationStatus.passwordValidation.passwordLevels}
        />
      )}
    </>
  );
}
