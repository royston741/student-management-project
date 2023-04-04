import React from "react";

export default function Alert(props) {
  return <div className={props.class}>{props.children}</div>;
}
