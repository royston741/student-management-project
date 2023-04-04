import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import useHttp from "../../../hooks/use-http";
import { NavLink } from "react-router-dom";

export default function Student({ id, name, email, phone, reload }) {
  const link = "/main/student/" + id;
  const updateLink="/main/updateStudent/"+id;

  const result = useHttp();
  const onDelete = async () => {
    const data = await result({
      url: "http://localhost:8080/deleteStudent/" + id,
      method: "DELETE",
    });
    reload();
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className="d-flex justify-content-evenly">
        <NavLink to={link}>
          <MDBBtn size="sm" outline>
            View
          </MDBBtn>
        </NavLink>
        <NavLink to={updateLink}>
        <MDBBtn size="sm" outline color="success">
          Update
        </MDBBtn>
        </NavLink>

        <MDBBtn
          onClick={onDelete}
          size="sm"
          outline
          className="mx-2"
          color="danger"
        >
          Delete
        </MDBBtn>
      </td>
    </tr>
  );
}
