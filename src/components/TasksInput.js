import React, { useState, useContext, useEffect } from 'react';
import { ListContext } from '../ListContext';
import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

function TasksInput({ task }) {
  const [newTaskState, setNewTaskState] = useState(task);
  const [newAssigneeState, setNewAssignee] = useState({
    email: '',
    newAssignedTo: '',
  });

  const taskState = useContext(ListContext);
  const {
    userIsNew,
    setNewUser,
    users,
    handleTaskChange,
    handleNewAssigneeSubmit,
    clearForm,
  } = taskState; //the context that this component is using

  function sendTasksToParent(e) {
    //sends tasks array to parent
    const { name, value } = e.target;
    setNewTaskState({ ...newTaskState, [name]: value }); //sets the new state of the tasks
  }

  useEffect(() => {
    handleTaskChange(newTaskState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTaskState]);

  function handleNewAssigneeChange(e) {
    const { name, value } = e.target;
    setNewAssignee({ ...newAssigneeState, [name]: value });
  }

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
          <Box display='flex' flexDirection='column'>
            <InputComponent
              title='New Assignee'
              type='text'
              name='newAssignedTo'
              value={newAssigneeState.newAssignedTo}
              change={handleNewAssigneeChange}
            />
            <InputComponent
              title='Email'
              type='text'
              name='email'
              value={newAssigneeState.email}
              change={handleNewAssigneeChange}
            />
          </Box>
          <Button
            variant='text'
            color='secondary'
            style={{ backgroundColor: 'transparent' }}
            onClick={(e) => {
              handleNewAssigneeSubmit(newAssigneeState);
              e.preventDefault();
              clearForm();
              setNewUser(false);
            }}
          >
            Add Assignee
          </Button>
        </>
      )}
    </Box>
  );
}

export default TasksInput;
