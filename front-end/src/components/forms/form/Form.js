import React, { useState } from "react";
import LogInForm from "../loginForm/LogInForm";
import SignUpForm from "../signUpForm/SignUpForm";
import "./Form.css";

export default function Form() {
  const [signUp, setSignUp] = useState(true);

  const changeFormHandler = () => {
    setSignUp((prev) => !prev);
  };

  return (
    <div className="form_container">
      {signUp ? (
        <SignUpForm onClick={changeFormHandler} />
      ) : (
        <LogInForm onClick={changeFormHandler} />
      )}
    </div>
  );
}
