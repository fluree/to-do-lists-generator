import React, { useState } from 'react';
import InputComponent from './InputComponent';
import { Box } from '@material-ui/core';

function TasksInput({ change, id }) {
  const [state, setState] = useState({
    id: id,
    completed: false,
    task: '',
    assignee: '',
    email: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    change(state);
  }

  return (
    <Box display='flex' flexDirection='column'>
      <InputComponent
        title='Task'
        type='text'
        name='task'
        value={state.task}
        change={handleChange}
      />
      <InputComponent
        title='Assignee'
        type='text'
        name='assignee'
        value={state.assignee}
        change={handleChange}
      />
      <InputComponent
        title='Email'
        type='text'
        name='email'
        value={state.email}
        change={handleChange}
      />
    </Box>
  );
}

export default TasksInput;
