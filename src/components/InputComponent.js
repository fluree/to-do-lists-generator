import React from 'react';
import { nanoid } from 'nanoid';
import { TextField } from '@material-ui/core';

function InputComponent({ title, name, value, change }) {
  return (
    <TextField
      type='text'
      margin='dense'
      label={title}
      variant='outlined'
      id={title + nanoid()}
      name={name}
      autoComplete='off'
      value={value}
      onChange={(e) => change(e)}
    />
  );
}

export default InputComponent;
