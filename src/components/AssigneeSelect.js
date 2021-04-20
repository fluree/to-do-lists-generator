import React, { useState, useEffect, useContext } from 'react';
import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { ListContext } from '../ListContext';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

function AssigneeSelect({ assignedTo, change }) {
  const assigneeState = useContext(ListContext);
  const {
    userIsNew,
    setNewUser,
    users,
    handleNewAssigneeSubmit,
    handleTaskChange,
  } = assigneeState;
  const [newAssigneeState, setNewAssignee] = useState({
    email: '',
    newAssignedTo: '',
  });
  const [chosenAssignee, setChosenAssignee] = useState(assignedTo);

  function handleAssigneeSelection(e) {
    const { name, value } = e.target;
    setChosenAssignee({
      ...chosenAssignee,
      [name]: value,
    });
    change(e);
  }

  useEffect(() => {
    handleTaskChange(chosenAssignee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenAssignee]);

  function handleNewAssigneeChange(e) {
    const { name, value } = e.target;
    setNewAssignee({ ...newAssigneeState, [name]: value });
  }

  function clearAssigneeSelection() {
    setChosenAssignee('');
  }

  return (
    <Box display='flex' flexDirection='column'>
      <InputLabel variant='filled' id='select-label'>
        Select Assignee
      </InputLabel>
      <Select
        title='Assignee'
        id='select-assignee'
        name='assignedTo'
        value={chosenAssignee.assignedTo || ''}
        type='select'
        onChange={handleAssigneeSelection}
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
              clearAssigneeSelection();
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

export default AssigneeSelect;
