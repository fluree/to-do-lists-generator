import React from "react";

export default function Todo(props) {
  return (
    <li className="">
      <div className="">
        <input id={props.id} type="checkbox" defaultChecked={true} />
        <label className="" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="">
        <button type="button" className="">
          Edit <span className="hidden">{props.name}</span>
        </button>
        <button type="button" className="">
          Delete <span className="hidden">{props.name}</span>
        </button>
      </div>
    </li>
  );
}
