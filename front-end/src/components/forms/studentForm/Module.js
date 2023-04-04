import React from "react";
import "./Module.css";

export default function Module(props) {
    const onCancel=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        props.onCancel(props.name);
    }
  return (
    <span className="module">
      <span>{props.name}</span>
      <button onClick={onCancel}>🗙</button>
    </span>
  );
}
