import React, { useState, useEffect } from 'react';
import InputComponent from './InputComponent';
import { Box } from '@material-ui/core';

function TasksInput({ change, id }) {
  const [state, setState] = useState({
    id: id,
    completed: false,
    task: '',
    assignedTo: '',
    email: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    change({ ...state, [name]: value });
  }

  // useEffect(() => {}, [state.email]);

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
        name='assignedTo'
        value={state.assignedTo}
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
