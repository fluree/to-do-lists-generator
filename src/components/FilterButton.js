import React from "react";

function FilterButton(props) {
  return (
    <button type="button" className="" aria-pressed="false">
      <span className="">Show </span>
      <span>Completed</span>
      <span className=""> tasks</span>
    </button>
  );
}

export default FilterButton;
