import React, { useState, useContext } from 'react';
import { ListContext } from '../ListContext';
import { nanoid } from 'nanoid';
import InputComponent from './InputComponent';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';

function Task({ task, handleDeletion }) {
  const taskInfo = useContext(ListContext);
  const { editTask, handleSubmit } = taskInfo;
  const [isEditing, setEditing] = useState(false);
  const [taskState] = useState({ ...task });
  const [newName, setNewName] = useState('');

  function handleNewNameChange(e) {
    setNewName(e.target.value); //sets the newName state to the input value
  }

  function setTaskNewName(e) {
    e.preventDefault();
    setNewName(''); //resets the newName state
    setEditing(false); //sets editing to false to hide the newName input
    editTask({ ...taskState, name: newName }); // calls the function from the context with the changed params
  }

  function toggleCheckbox() {
    //changes the checkbox state
    const taskCompleted = !taskState.isCompleted;
    editTask({ ...taskState, isCompleted: taskCompleted }); //calls the function from the context to recieve the change
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
          id={`checkbox-${taskState._id}`}
          name='completed'
          checked={taskState.isCompleted}
          onChange={() => toggleCheckbox()}
        />
        <label id={taskState._id} className='' htmlFor={taskState._id}>
          {taskState.name}
        </label>
        <label id={'assignee-' + nanoid()} className=''>
          {taskState.assignedTo ? taskState.assignedTo.name : ''}
        </label>
        <label id={'email-' + nanoid()} className=''>
          {taskState.assignedTo.email}
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
            {taskState.name}
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
            {taskState.task}
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
              <label className='' htmlFor={taskState._id + 'New-Name'}>
                New name for {taskState.name}
              </label>
              <InputComponent
                id={taskState._id + 'New-Name'}
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
                  renaming {taskState.name}
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
                  new name for {taskState.name}
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
