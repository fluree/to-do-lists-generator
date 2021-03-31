import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import InputComponent from './InputComponent';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';

function Task({ task, handleSubmit, handleDeletion }) {
  const [isEditing, setEditing] = useState(false);
  const [state, setState] = useState({ ...task });
  const [newName, setNewName] = useState('');

  function handleNewNameChange(e) {
    setNewName(e.target.value);
  }

  async function setTaskNewName(e) {
    e.preventDefault();
    await setState({ ...task, task: newName });
    setNewName('');
    setEditing(false);
    handleSubmit(state);
  }
  async function toggleCheckbox() {
    const taskCompleted = !state.completed;
    await setState({ ...task, completed: taskCompleted }, () => {
      handleSubmit(state);
    });
  }

  return (
    <Container
      style={{
        borderStyle: 'dotted',
        borderWidth: '5px',
        borderColor: '#979797',
        marginBottom: '1rem',
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='baseline'>
        <Checkbox
          id={state.id}
          name='completed'
          value={state.isCompleted || false}
          checked={state.isCompleted}
          onChange={() => toggleCheckbox()}
        />
        <label id={state._id} className='' htmlFor={state.id}>
          {state.name}
        </label>
        <label id={'assignee-' + nanoid()} className=''>
          {state.assignedTo ? state.assignedTo.name : ''}
        </label>
        <label id={'email-' + nanoid()} className=''>
          {state.assignedTo.email}
        </label>
      </Box>
      <Box display='flex' justifyContent='space-evenly'>
        <Button
          variant='text'
          color='primary'
          type=''
          className=''
          onClick={() => setEditing(true)}
        >
          Edit
          <Box component='span' display='none'>
            {state.name}
          </Box>
        </Button>
        <Button
          variant='text'
          color='primary'
          type='button'
          className=''
          onClick={() => handleDeletion(task)}
        >
          Delete
          <Box component='span' display='none'>
            {state.task}
          </Box>
        </Button>
      </Box>
      {isEditing && (
        <form className='' onSubmit={handleSubmit}>
          <Container>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='baseline'
              justifyContent='space-evenly'
            >
              <label className='' htmlFor={state.id + 'New-Name'}>
                New name for {state.name}
              </label>
              <InputComponent
                id={state._id + 'New-Name'}
                className=''
                type='text'
                name='newName'
                value={newName}
                change={handleNewNameChange}
                title='New Task'
              />
            </Box>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='baseline'
              justifyContent='space-evenly'
              p={2}
            >
              <Button
                variant='contained'
                size='small'
                type='button'
                className=''
                onClick={() => setEditing(false)}
              >
                Cancel
                <Box component='span' display='none'>
                  renaming {state.name}
                </Box>
              </Button>
              <Button
                variant='contained'
                size='small'
                type='submit'
                onClick={(e) => setTaskNewName(e)}
              >
                Save
                <Box component='span' display='none'>
                  new name for {state.name}
                </Box>
              </Button>
            </Box>
          </Container>
        </form>
      )}
    </Container>
  );
}
export default Task;
