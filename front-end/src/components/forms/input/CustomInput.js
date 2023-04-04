import React, { useRef } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import Error from "./Error";
import Button from "../../ui/Button";

export default function CustomInput({
  onIput,
  btnText,
  onBtnClick,
  value,
  isDisable,
  label,
  type,
  size = "lg",
  list=[],
  error,
  errMsg,
}) {
  let module = useRef();
  const addModule = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onBtnClick(module.current.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-md-between">
        <MDBInput
          onChange={(e) => {
            onIput(e.target.value);
          }}
          onBlur={(e) => {
            onIput(e.target.value);
          }}
          value={value}
          label={label}
          id="formControlLg"
          list="module"
          type={type}
          size={size}
          ref={module}
          autoComplete="off"
        />
        <Button onClick={addModule} isDisable={!isDisable} classN="ms-4">
          {btnText}
        </Button>
      </div>

      <datalist id="module">
        {list.map((le) => {
          return <option key={le} value={le}>{le}</option>;
        })}
      </datalist>

      {!error && <Error errMsg={errMsg} />}
    </div>
  );
}
