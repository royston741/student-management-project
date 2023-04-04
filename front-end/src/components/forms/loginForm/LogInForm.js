import React, { useState } from "react";
import Button from "../../ui/Button";
import Alert from "../form/Alert";
import Input from "../input/Input";
import Loading from "../../ui/Loading";
import useHttp from "../../../hooks/use-http";
import { useNavigate } from "react-router-dom";

// default values for form input
let defaultValues = {
  userName: {
    value: "",
    isValid: true,
  },
  userPassword: {
    value: "",
    isValid: true,
  }
};

export default function LogInForm({ onClick }) {
  // set form state
  const [form, setForm] = useState(defaultValues);

  // error state if invalid username or passwword
  const [err, setErr] = useState(false);

  // is loading state
  const [isLoading, setIsLoading] = useState();

  const result = useHttp();

  const navigate=useNavigate();

  // on user name change
  const userNameChangeHandler = (val) => {
    // set error
    setErr(false);

    // set user name
    setForm((prev) => {
      return { ...prev, userName: { value: val, isValid: val.length > 3 } };
    });
  };

  // on user password change
  const passwordChangeHandler = (val) => {
    // set error
    setErr(false);

    // set user password
    setForm((prev) => {
      return { ...prev, userPassword: { value: val, isValid: val.length > 3 } };
    });
  };

  // is button disabled
  let isButtonDisable =
    form.userName.value.length > 3 && form.userPassword.value.length > 3;

  // submit form
  const onFormSubmit = async (e) => {
    e.preventDefault();
    // set error
    setErr(false);
    // is loading true
    setIsLoading(true);

    let obj = {
      userName: form.userName.value,
      password: form.userPassword.value,
    };

    // waiting for response
    let data = await result({
      url: "http://localhost:8080/login",
      method:"POST",
      body:  obj 
    });

    // if true tahn log in
    if(data){
      navigate("/main/addStudent");
    }
    // if not log in
    else{
      // throw err
      setErr(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    // set default values for form
    setForm(defaultValues);
  };

  return (
    <>
      <form
        onSubmit={onFormSubmit}
        className="form_width d-grid gap-3 bg-light p-5 rounder"
      >
        <h2 className="form_header">Log In</h2>
        <Input
          onIput={userNameChangeHandler}
          value={form.userName.value}
          label="Enter user name"
          type="text"
          error={form.userName.isValid}
          errMsg="User name should contain atleast 3 letter character"
        />

        <Input
          onIput={passwordChangeHandler}
          value={form.userPassword.value}
          label="Enter user password"
          type="text"
          error={form.userPassword.isValid}
          errMsg="User password should contain atleast 3 character"
        />

        <p>
          Don't have a account?
          <button onClick={onClick} className="navigate_form">
            Sign up
          </button>
        </p>

        {err && <Alert class="err_msg">Invalid user name or password</Alert>}

        <Button isDisable={!isButtonDisable}>
          {isLoading ? <Loading /> : "Submit"}
        </Button>
      </form>
    </>
  );
}
