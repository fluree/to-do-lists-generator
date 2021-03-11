import React from 'react';
import { nanoid } from 'nanoid';

function InputComponent({ title, name, value, change }) {
  return (
    <label>
      {title}
      <input
        type='text'
        id={title + nanoid()}
        className='border-2 rounded-md border-gray-400'
        name={name}
        autoComplete='off'
        value={value}
        onChange={(e) => change(e)}
      />
    </label>
  );
}

export default InputComponent;
