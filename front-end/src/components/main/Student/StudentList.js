import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import useHttp from "../../../hooks/use-http";
import Student from "./Student";
import Search from "../../forms/studentForm/Search";
import Button from "../../ui/Button";

export default function StudentList() {
  let [studentlist, setStudentList] = useState([]);
  let [tempArr, setTempArr] = useState([]);

  const result = useHttp();

  const fetchStudents = async () => {
    const data = await result({
      url: "http://localhost:8080/getAllStudents",
    });
    setTempArr(data);
    setStudentList(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onSearch = (e) => {
    const arr = tempArr.filter((el) => {
      return el.id == e;
    });
    setStudentList(arr);
  };

  const sortById=()=>{
    let arr=[...studentlist];

    for(let i=0;i<arr.length;i++){
      for(let j=i+1;j<arr.length;j++){
        if(arr[i].id>arr[j].id){
          let a=arr[i];
          arr[i]=arr[j];
          arr[j]=a;
        }
      }
    }
    setStudentList(arr)
  }
  return (
    <>
      <Search onSearch={onSearch} setFullList={setStudentList} temp={tempArr} />
      <Button classN="sort_btn" onClick={sortById}>Sort by Id</Button>
      <MDBTable align="middle" className="w-75 table">
        <MDBTableHead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no.</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {studentlist.map((student) => {
            return (
              <Student
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                phone={student.phoneNo}
                reload={fetchStudents}
              />
            );
          })}
        </MDBTableBody>
      </MDBTable>
      {studentlist.length===0 && <p>No students</p>}
    </>
  );
}
