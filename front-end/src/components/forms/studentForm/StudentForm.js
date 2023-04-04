import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Alert from "../form/Alert";
import Input from "../input/Input";
import Loading from "../../ui/Loading";
import useHttp from "../../../hooks/use-http";
import CustomInput from "../input/CustomInput";
import Module from "./Module";
import { useNavigate, useParams } from "react-router-dom";

// default values for form input
let defaultValues = {
  studentName: {
    value: "",
    isValid: true,
  },
  studentPhoneNo: {
    value: "",
    isValid: true,
  },
  studentEmail: {
    value: "",
    isValid: true,
  },
  studentModule: {
    value: "",
    modules: [],
    isValid: true,
    isValidModule: false,
  },
};

// list of modules;
let modules = [
  "Java",
  "Python",
  "C",
  "C++",
  "Hibernate",
  "Spring boot",
  "React",
  "Angular",
  "SQL",
  "Node.js",
  "Express.js",
];

// Student form component
export default function StudentForm({ url, method, head }) {
  // get the id in url
  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // set form state
  const [form, setForm] = useState(defaultValues);

  // error state if fasle from server
  const [err, setErr] = useState(false);

  // is loading state
  const [isLoading, setIsLoading] = useState();

  const result = useHttp();

  // on student name change
  const studentNameChangeHandler = (val) => {
    // set error
    setErr(false);

    // set student name
    setForm((prev) => {
      return { ...prev, studentName: { value: val, isValid: val.length > 3 } };
    });
  };

  // on phone no. change
  const phoneNoChangeHandler = (val) => {
    // set error
    setErr(false);

    // set student phone no
    setForm((prev) => {
      return {
        ...prev,
        studentPhoneNo: { value: val, isValid: val.length === 10 },
      };
    });
  };

  // on email change
  const emailChangeHandler = (val) => {
    // set error
    setErr(false);
    // set email
    setForm((prev) => {
      return {
        ...prev,
        studentEmail: {
          value: val,
          isValid: val.length > 3 && val.includes("@"),
        },
      };
    });
  };

  // on module change
  const moduleChangeHandler = (val) => {
    // set error
    setErr(false);

    // set email
    setForm((prev) => {
      return {
        ...prev,
        studentModule: {
          ...prev.studentModule,
          value: val,
          isValid: modules.includes(val),
          isValidModule:
            modules.includes(val) && !prev.studentModule.modules.includes(val),
        },
      };
    });
  };

  // on add module
  const moduleAddHandler = (val) => {
    // set error
    setErr(false);
    // set email
    setForm((prev) => {
      return {
        ...prev,
        studentModule: {
          value: "",
          isValid: true,
          isValidModule: false,
          modules: [...prev.studentModule.modules, val],
        },
      };
    });
  };

  // on add module
  const moduleCancelHandler = (val) => {
    // set error
    setErr(false);

    // get the index of the value to be canceled
    let index = form.studentModule.modules.indexOf(val);
    // get the array
    let arr = form.studentModule.modules;
    // remove the value from the array
    arr.splice(index, 1);

    setForm((prev) => {
      return {
        ...prev,
        studentModule: {
          value: "",
          isValid: true,
          isValidModule: false,
          modules: [...arr],
        },
      };
    });
  };

  // is button disabled
  let isButtonDisable =
    form.studentName.value.length > 3 &&
    form.studentPhoneNo.value.length === 10 &&
    form.studentEmail.value.includes("@") &&
    form.studentEmail.value.length > 3 &&
    form.studentModule.modules.length > 0;

  // submit form
  const onFormSubmit = async (e) => {
    e.preventDefault();
    // set error
    setErr(false);
    // is loading true
    setIsLoading(true);

    let obj = {
      name: form.studentName.value,
      phoneNo: form.studentPhoneNo.value,
      email: form.studentEmail.value,
      subjects: form.studentModule.modules.map((e) => {
        return { subjectName: e };
      }),
    };

    // waiting for response
    let data = await result({
      url: url + (id > 0 ? id : ""),
      method: method,
      body: obj,
    });

    // if true tahn log in
    if (data) {
      navigate("/main/studentList");
    }
    // if not log in
    else {
      // throw err
      setErr(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    // set default values for form
    setForm(defaultValues);
  };

  const fetchData = async () => {
    if (!id) {
      return;
    }
    const data = await result({
      url: "http://localhost:8080/getStudentById/" + id,
    });
    // console.log(data);
    let val = {
      studentName: {
        value: data.name,
        isValid: true,
      },
      studentPhoneNo: {
        value: data.phoneNo,
        isValid: true,
      },
      studentEmail: {
        value: data.email,
        isValid: true,
      },
      studentModule: {
        value: "",
        modules: data.subjects.map((v) => {
          return v.subjectName;
        }),
        isValid: true,
        isValidModule: false,
      },
    };
    console.log(val);
    setForm(val);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <form
        onSubmit={onFormSubmit}
        className="form_width d-grid gap-3 bg-light p-5 rounder"
      >
        <h2 className="text-center">{head}</h2>
        <Input
          onIput={studentNameChangeHandler}
          value={form.studentName.value}
          label="Enter Full name"
          type="text"
          error={form.studentName.isValid}
          errMsg="Name should contain atleast 3 letter character"
        />

        <Input
          onIput={phoneNoChangeHandler}
          value={form.studentPhoneNo.value}
          label="Enter phone number"
          type="number"
          error={form.studentPhoneNo.isValid}
          errMsg="Phone number should be 10 digits"
        />

        <Input
          onIput={emailChangeHandler}
          value={form.studentEmail.value}
          label="Enter email"
          type="text"
          error={form.studentEmail.isValid}
          errMsg="Please enter valid email"
        />

        <CustomInput
          onIput={moduleChangeHandler}
          onBtnClick={moduleAddHandler}
          isDisable={form.studentModule.isValidModule}
          value={form.studentModule.value}
          btnText="Add"
          label="Enter module name"
          type="text"
          list={modules}
          error={form.studentModule.isValid}
          errMsg="Please enter valid Module"
        />

        <div className="modules">
          {form.studentModule.modules.map((module) => {
            return (
              <Module
                key={module}
                name={module}
                onCancel={moduleCancelHandler}
              />
            );
          })}
        </div>

        {err && <Alert class="err_msg">Failed to add student</Alert>}

        <Button isDisable={!isButtonDisable} type="submit">
          {isLoading ? <Loading /> : "Submit"}
        </Button>
      </form>
    </>
  );
}
