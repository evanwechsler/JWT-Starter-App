import React, { ComponentProps, ReactElement } from "react";
import DotSpinner from "./DotSpinner";

interface Props extends ComponentProps<"button"> {
  text: string;
  loading: boolean;
}

export default function LoadingButton({
  text,
  loading,
  ...rest
}: Props): ReactElement {
  return (
    <button disabled={loading} {...rest}>
      {loading ? <DotSpinner color="white" size="14px" /> : text}
    </button>
  );
}
