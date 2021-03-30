import React, { useState, useContext, useEffect } from 'react';
import { ListContext } from '../ListContext';
import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Box } from '@material-ui/core';

function TasksInput({ task }) {
  const [newTaskState, setNewTaskState] = useState(task);

  const taskState = useContext(ListContext);
  const { userIsNew, setNewUser, users, handleTaskChange } = taskState;

  function sendTasksToParent(e) {
    const { name, value } = e.target;
    setNewTaskState({ ...newTaskState, [name]: value });
  }

  useEffect(() => {
    handleTaskChange(newTaskState);
  }, [newTaskState]);

  return (
    <Box display='flex' flexDirection='column'>
      <InputComponent
        title='Task'
        type='text'
        name='task'
        value={newTaskState.task}
        change={sendTasksToParent}
      />
      <InputLabel variant='filled' id='select-label'>
        Select Assignee
      </InputLabel>
      <Select
        title='Assignee'
        name='assignedTo'
        value={newTaskState.assignedTo ? newTaskState.assignedTo : 'new'}
        type='select'
        onChange={sendTasksToParent}
        variant='filled'
      >
        {users.map((user, id) => (
          <MenuItem key={id} value={user._id} onClick={() => setNewUser(false)}>
            {user.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setNewUser(true)} value='new'>
          New Assignee
        </MenuItem>
      </Select>
      {userIsNew && (
        <>
          <InputComponent
            title='New Assignee'
            type='text'
            name='newAssignedTo'
            value={newTaskState.newAssignedTo}
            change={sendTasksToParent}
          />
          <InputComponent
            title='Email'
            type='text'
            name='email'
            value={newTaskState.email}
            change={sendTasksToParent}
          />
        </>
      )}
    </Box>
  );
}

export default TasksInput;
