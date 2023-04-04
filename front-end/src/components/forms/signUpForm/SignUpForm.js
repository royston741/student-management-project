import React, { useState } from "react";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";
import Alert from "../form/Alert";
import Input from "../input/Input";

import useHttp from "./../../../hooks/use-http";

// default values for form input
let defaultValues = {
  userName: {
    value: "",
    isValid: true,
  },
  userPassword: {
    value: "",
    isValid: true,
  },
  confirmUserPassword: {
    value: "",
    isValid: true,
  },
};

// default values for form message
let defaultMsg = {
  userExist: false,
  userAdded: false,
};

export default function SignUpForm({ onClick }) {
  // form state
  const [form, setForm] = useState(defaultValues);

  // message state whe submitted
  const [msg, setMsg] = useState(defaultMsg);

  // is loading state
  const [isLoading, setIsLoading] = useState();

  // get function from http hook
  const result = useHttp();

  // on user name change
  const userNameChangeHandler = (val) => {
    // set default message
    setMsg(defaultMsg);
    // set user name
    setForm((prev) => {
      return { ...prev, userName: { value: val, isValid: val.length > 3 } };
    });
  };

  // on user password change
  const passwordChangeHandler = (val) => {
    // set default message
    setMsg(defaultMsg);
    // set user password
    setForm((prev) => {
      return { ...prev, userPassword: { value: val, isValid: val.length > 3 } };
    });
  };

  // on confirm password change
  const confirmPasswordChangeHandler = (val) => {
    // set default message
    setMsg(defaultMsg);
    // on confirm password change
    setForm((prev) => {
      return {
        ...prev,
        confirmUserPassword: {
          value: val,
          isValid: val === form.userPassword.value ? true : false,
        },
      };
    });
  };

  // is button disabled
  let isButtonDisable =
    form.userName.value.length > 3 &&
    form.userPassword.value.length > 3 &&
    form.confirmUserPassword.value === form.userPassword.value;

  // let isLoading =false;
  // submit form
  const onFormSubmit = async (e) => {
    e.preventDefault();

    // loding is true
    setIsLoading(true);
    let obj = {
      userName: form.userName.value,
      password: form.userPassword.value,
    };

    // wait for the response from the backend
    let data = await result({
      url: "http://localhost:8080/signup",
      method: "POST",
      body: obj,
    });

    // if true i.e user added successfully
    if (data) {
      // user added
      setMsg((prev) => {
        return { ...prev, userAdded: true };
      });
    }
    // if false i.e user not added (user name already exist)
    else {
      // user already exist
      setMsg((prev) => {
        return { ...prev, userExist: true };
      });
      // set is loading to false
      setIsLoading(false);
      // exit
      return;
    }

    // set is loading to false
    setIsLoading(false);

    // set form values default i.e empty
    setForm(defaultValues);
  };

  return (
    <>
      <form
        onSubmit={onFormSubmit}
        className="form_width d-grid gap-3 bg-light p-5 rounder"
      >
        <h2 className="form_header">Sign Up</h2>
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

        <Input
          onIput={confirmPasswordChangeHandler}
          value={form.confirmUserPassword.value}
          label="Confirm user password"
          type="text"
          error={form.confirmUserPassword.isValid}
          errMsg="Confirm password should be same as user passord"
        />

        <p>
          Already have a account?
          <button onClick={onClick} className="navigate_form">
            Log in
          </button>
        </p>

        {msg.userExist && (
          <Alert class="err_msg">User name already exist</Alert>
        )}
        {msg.userAdded && (
          <Alert class="success_msg">Account created successfully</Alert>
        )}

        <Button isDisable={!isButtonDisable}>
          {isLoading ? <Loading /> : "Submit"}
        </Button>
      </form>
    </>
  );
}
