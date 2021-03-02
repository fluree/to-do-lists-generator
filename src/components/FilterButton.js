import React from 'react';

function FilterButton(props) {
  return (
    <button
      type='button'
      className=''
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className='hidden'>Show </span>
      <span>{props.name}</span>
      <span className='hidden'> tasks</span>
    </button>
  );
}

export default FilterButton;
