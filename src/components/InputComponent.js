import React from 'react';
import { TextField } from '@material-ui/core';

function InputComponent({ title, name, value, change, index }) {
  return (
    <TextField
      type='text'
      margin='dense'
      label={title}
      variant='outlined'
      id={title + index}
      name={name}
      autoComplete='off'
      value={value}
      onChange={(e) => change(e)}
    />
  );
}

export default InputComponent;
