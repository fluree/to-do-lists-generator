import React from 'react';
import { TextField } from '@material-ui/core';

function InputComponent({ title, name, value, change }) {
  return (
    <TextField
      type='text'
      margin='dense'
      label={title}
      variant='outlined'
      id={title + `${Math.floor(Math.random() * 10 + 1)}`}
      name={name}
      autoComplete='off'
      value={value}
      onChange={(e) => change(e)}
    />
  );
}

export default InputComponent;
