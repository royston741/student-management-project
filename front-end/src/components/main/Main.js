import React from "react";
import StudentForm from "../forms/studentForm/StudentForm";
import StudentList from "./Student/StudentList";
import { Outlet} from "react-router-dom";
import Header from "../ui/Header";

export default function Main() {
  return (
    <>
     <Header/>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
}
