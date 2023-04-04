import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import "./Header.css";
import Button from "./Button";

export default function Header() {
  const navigate=useNavigate();

  const isActiveHandler = (allData) => {
    return allData.isActive ? "active" : "";
  };

  const onLogOut=()=>{
    navigate("/form");
  }

  return (
    <header>
      <nav className="">
        <ul className="menu">
          <NavLink to="/main/addStudent" className={isActiveHandler}>
            <li>Add Student</li>
          </NavLink>
          <NavLink to="/main/studentList">
            <li>Student List</li>
          </NavLink>
          <Button onClick={onLogOut} classN="ms-4">Log out</Button>
        </ul>
      </nav>
    </header>
  );
}
