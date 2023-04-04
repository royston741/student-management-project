import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import Error from "./Error";

export default function Input({
  onIput,
  value,
  label,
  type,
  size = "lg",
  error,
  errMsg,
  disabled
}) {
  return (
    <div>
      <MDBInput
      disabled={disabled}
        onChange={(e) => {
          onIput(e.target.value);
        }}
        onBlur={(e) => {
          onIput(e.target.value);
        }}
        value={value}
        label={label}
        id="formControlLg"
        type={type}
        size={size}
      />
      {!error && <Error errMsg={errMsg} />}
    </div>
  );
}
