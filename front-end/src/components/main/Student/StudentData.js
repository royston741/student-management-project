import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../forms/input/Input";
import Module from "../../forms/studentForm/Module";
import useHttp from "../../../hooks/use-http";

export default function StudentData() {
  const [student, setStudent] = useState({
    name: "",
    phoneNo: "",
    email: "",
    subjects: [],
  });
  const { id } = useParams();
  const result = useHttp();

  const fetchData = async () => {
    const data = await result({
      url: "http://localhost:8080/getStudentById/" + id,
    });
    setStudent(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <form className="form_width d-grid gap-3 bg-light p-5 rounder">
        <h2 className="text-center">Student Info</h2>
        <Input value={student.name} label="Enter Full name" disabled={true}/>

        <Input value={student.phoneNo} label="Enter phone number" disabled={true}/>

        <Input value={student.email} label="Enter email" disabled={true}/>

        <div className="modules">
          {student.subjects.map((module) => {
            return (
              <span className="module" key={module}>
                <span>{module.subjectName}</span>
              </span>
            );
          })}
        </div>
      </form>
    </>
  );
}
