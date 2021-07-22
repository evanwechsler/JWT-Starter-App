import React, { ReactElement, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>((props, ref): ReactElement => {
  const [hidden, setHidden] = useState(true);

  const inputType = hidden ? "password" : "text";

  return (
    <div className="password">
      <input type={inputType} {...props} ref={ref} />
      <div className="eye" onClick={() => setHidden(!hidden)}>
        {hidden ? <BsEye /> : <BsEyeSlash />}
      </div>
    </div>
  );
});

export default PasswordInput;
