import React from "react";

export default function Todo() {
  return (
    <li className="">
      <div className="">
        <input id="todo-0" type="checkbox" defaultChecked={true} />
        <label className="" htmlFor="todo-0">
          Eat
        </label>
      </div>
      <div className="">
        <button type="button" className="">
          Edit <span className="visually-hidden">Eat</span>
        </button>
        <button type="button" className="">
          Delete <span className="visually-hidden">Eat</span>
        </button>
      </div>
    </li>
  );
}
