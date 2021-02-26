import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="">
        <label htmlFor="new-todo-input" className="">
          Add a task and assign it to a person
        </label>
      </h2>
      <div>
        <input
          type="text"
          id="new-todo-input"
          className="border-2 rounded-md border-gray-400"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          id="new-name-input"
          className="border-2 rounded-md border-gray-400"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        /> */}
      </div>
      <button type="submit" className="">
        Add
      </button>
    </form>
  );
}

export default Form;
