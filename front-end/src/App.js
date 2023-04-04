import StudentForm from "./components/forms/studentForm/StudentForm";
import Main from "./components/main/Main";
import StudentList from "./components/main/Student/StudentList";
import Form from "./components/forms/form/Form";
import { Route, Routes } from "react-router-dom";
import StudentData from "./components/main/Student/StudentData";

function App() {
  return (
    <>
      <Routes>
      {/* Form */}
        <Route path="/form" element={<Form />}></Route>
        {/* Main  */}
        <Route path="/main" element={<Main />}>
          {/* Add student  */}
          <Route
            path="/main/addStudent"
            element={
              <StudentForm
                url={"http://localhost:8080/createStudent"}
                method="POST"
                head="Add Student"
              />
            }
          ></Route>
          {/* Student List */}
          <Route path="/main/studentList" element={<StudentList />}></Route>
          {/* View  student*/}
          <Route path="/main/student/:id" element={<StudentData />}></Route>
          {/* Update student */}
          <Route
            path="/main/updateStudent/:id"
            element={
              <StudentForm
                url={"http://localhost:8080/updateStudentById/"}
                method={"PUT"}
                head="Update Student"
              />
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
