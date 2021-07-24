import React, { ReactElement } from "react";
import {
  PasswordLevels,
  PasswordMessages,
} from "../auth/validators/passwordValidator";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";

interface Props {
  messages: PasswordMessages;
  validated: PasswordLevels;
}

export default function PasswordValidationMessages({
  messages,
  validated,
}: Props): ReactElement {
  return (
    <div className="password-messages">
      {Object.keys(messages).map((key) => {
        const messageKey = key as keyof typeof messages;
        const validatedKey = key as keyof typeof validated;
        const isValid = validated[validatedKey];
        return (
          <div key={messageKey} className={isValid ? "valid" : "invalid"}>
            {isValid ? <BiCheckCircle /> : <BiXCircle />}
            {messages[messageKey]}
          </div>
        );
      })}
    </div>
  );
}
