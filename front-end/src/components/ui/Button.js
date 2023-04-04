import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";

export default function Button({
  type = "",
  classN="",
  isDisable,
  onClick = () => {},
  children,
}) 
{
  const classVal="me-1 fs-6 "+ classN;
  return (
    <>
      <MDBBtn
        className={classVal}
        type={type}
        disabled={isDisable}
        onClick={onClick}
      >
        {children}
      </MDBBtn>
    </>
  );
}
