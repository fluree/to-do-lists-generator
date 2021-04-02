import React, { useState, useContext, useEffect } from 'react';
import { ListContext } from '../ListContext';
import { nanoid } from 'nanoid';
import InputComponent from './InputComponent';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Box } from '@material-ui/core';

function Task({ task, handleSubmit, handleDeletion }) {
  const taskInfo = useContext(ListContext);
  const { editTask } = taskInfo;
  const [isEditing, setEditing] = useState(false);
  let [taskState, setEditableState] = useState({ ...task });
  const [newName, setNewName] = useState('');

  function handleNewNameChange(e) {
    setNewName(e.target.value);
  }

  function setTaskNewName(e) {
    e.preventDefault();
    setEditableState({ ...taskState, name: newName });
    setNewName('');
    setEditing(false);
    editTask(taskState);
  }

  useEffect(() => {
    console.log(taskState);
  }, [taskState]);

  async function toggleCheckbox() {
    // const taskCompleted = !taskState.completed;
    // await setState({ ...task, completed: taskCompleted }, () => {
    //   handleSubmit(taskState);
    // });
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
          id={taskState.id}
          name='completed'
          value={taskState.isCompleted || false}
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
