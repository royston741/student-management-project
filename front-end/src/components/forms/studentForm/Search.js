import React, { useState } from "react";
import CustomInput from "../input/CustomInput";

const defaultValues = {
  value: "",
  isValid: true,
};

export default function Search({ onSearch, setFullList, temp }) {
  const [id, setId] = useState(defaultValues);
  const isDisable = id.value.length > 0;

  const onIdChange = (val) => {
    if (val === "") {
        setFullList(temp);
    }
    setId({ value: val, isValid: val.length > 0 });
  };

  return (
    <div >
      <CustomInput
        onIput={onIdChange}
        value={id.value}
        onBtnClick={onSearch}
        btnText="Search"
        isDisable={isDisable}
        label="Enter student id"
        type="number"
        error={id.isValid}
        errMsg="Please enter valid Module"
      />
    </div>
  );
}
