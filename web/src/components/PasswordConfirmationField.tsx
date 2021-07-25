import React, { ReactElement, useState } from "react";
import PasswordInput from "./PasswordInput";
import { BiXCircle } from "react-icons/bi";

interface Props {
  password: string;
  setPasswordsMatch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordConfirmationField({
  password,
  setPasswordsMatch,
}: Props): ReactElement {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [focus, setFocus] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.currentTarget.value);
    if (e.currentTarget.value === password) {
      console.log("hello");

      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  return (
    <>
      <PasswordInput
        onChange={handleChange}
        placeholder="Confirm Password"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        required
      />
      {password !== passwordConfirmation && focus && (
        <div className="password-confirmation-message">
          <BiXCircle />
          Passwords do not match
        </div>
      )}
    </>
  );
}
