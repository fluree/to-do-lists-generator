import React, { useContext } from 'react';
import { ListContext } from '../ListContext';
import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Box } from '@material-ui/core';

function TasksInput({ change, id }) {
  // const createNewUser = async () => {
  //   const newUser = `assignee${'$' + Math.floor(Math.random() * 10 + 1)}`;
  //   const assigneeResponse = await axios.post(
  //     `http://localhost:8080/fdb/todo/lists/transact`,
  //     [
  //       {
  //         _id: newUser,
  //         'assignee/name': state.assignedTo,
  //       },
  //     ]
  //   );
  //   return assigneeResponse['tempids'][newUser];
  // };

  const taskState = useContext(ListContext);

  const {
    inputState,
    userIsNew,
    setNewUser,
    users,
    handleChange,
    handleInputChange,
  } = taskState;

  return (
    <Box display='flex' flexDirection='column'>
      <InputComponent
        title='Task'
        type='text'
        name='task'
        value={inputState.task}
        change={handleChange}
      />
      <InputLabel variant='filled' id='select-label'>
        Select Assignee
      </InputLabel>
      <Select
        title='Assignee'
        name='assignedTo'
        value={inputState.assignedTo}
        type='select'
        onChange={handleChange}
        variant='filled'
      >
        {users.map((user, id) => (
          <MenuItem
            key={id}
            value={user.name}
            onClick={() => setNewUser(false)}
          >
            {user.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setNewUser(true)} value='new'>
          New Assignee
        </MenuItem>
      </Select>
      {userIsNew && (
        <InputComponent
          title='New Assignee'
          type='text'
          name='newAssignedTo'
          value={inputState.newAssignedTo}
          change={handleInputChange}
        />
      )}
      <InputComponent
        title='Email'
        type='text'
        name='email'
        value={inputState.email}
        change={handleChange}
      />
    </Box>
  );
}

export default TasksInput;
