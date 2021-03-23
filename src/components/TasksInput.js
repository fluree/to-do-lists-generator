import React, { useState, useEffect } from 'react';
import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Box } from '@material-ui/core';
import axios from 'axios';

function TasksInput({ change, id }) {
  const [state, setState] = useState({
    id: id,
    completed: false,
    task: '',
    assignedTo: '',
    email: '',
  });
  const [users, setUsers] = useState([]);

  function handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
    change({ ...state, [name]: value });
  }

  const loadAssignedToData = async () => {
    const response = await axios.post(
      `http://localhost:8080/fdb/todo/lists/query`,
      {
        select: ['assignee/_id', 'assignee/email', 'assignee/name'],
        from: 'assignee',
        opts: {
          compact: true,
          orderBy: ['ASC', '_id'],
        },
      }
    );
    setUsers(response.data);
  };

  useEffect(() => {
    loadAssignedToData();
  }, []);

  return (
    <Box display='flex' flexDirection='column'>
      <InputComponent
        title='Task'
        type='text'
        name='task'
        value={state.task}
        change={handleChange}
      />
      <InputLabel variant='filled' id='select-label'>
        Select Assignee
      </InputLabel>
      <Select
        title='Assignee'
        name='assignedTo'
        value={state.assignedTo}
        type='select'
        onChange={handleChange}
        variant='filled'
      >
        {users.map((user, id) => (
          <MenuItem key={id} value={user.name}>
            {user.name}
          </MenuItem>
        ))}
        <MenuItem value='new'>New Assignee</MenuItem>
      </Select>
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
