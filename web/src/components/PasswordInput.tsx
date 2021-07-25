import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props extends React.HTMLProps<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ onChange, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);
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
