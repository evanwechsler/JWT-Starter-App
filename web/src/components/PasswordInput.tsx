import React, { ReactElement, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props extends React.HTMLProps<HTMLInputElement> {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ onChange, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);
  const inputType = hidden ? "password" : "text";

  return (
    <div className="password">
      <input type={inputType} {...rest} onChange={onChange} />
      <div className="eye" onClick={() => setHidden(!hidden)}>
        {hidden ? <BsEye /> : <BsEyeSlash />}
      </div>
    </div>
  );
}
