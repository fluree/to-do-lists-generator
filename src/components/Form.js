import React, { useState } from 'react';
import InputComponent from './InputComponent';
import TasksInput from './TasksInput';
import { nanoid } from 'nanoid';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

function Form({ submit }) {
  const [state, setState] = useState({
    name: '',
    description: '',
    tasks: [
      {
        id: `task-${nanoid()}`,
        completed: false,
        task: '',
        assignee: '',
        email: '',
      },
    ],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleTaskChange(task) {
    let newTasks = state.tasks;
    console.log(task);
    const index = newTasks.findIndex((newTask) => newTask.id === task.id);
    newTasks[index] = task;
    setState({ ...state, tasks: newTasks });
  }

  function addMoreInputs() {
    console.log('click');
    let moreTasks = state.tasks;
    moreTasks.push({
      id: `task-${nanoid()}`,
      completed: false,
      task: '',
      assignee: '',
      email: '',
    });
    setState({ ...state, tasks: moreTasks });
  }

  function clearForm() {
    setState({
      name: '',
      description: '',
      tasks: [
        {
          id: `task-${nanoid()}`,
          completed: false,
          task: '',
          assignee: '',
          email: '',
        },
      ],
    });
  }
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <form style={{ minWidth: '18rem' }} autoComplete='off'>
        <Box display='flex' flexDirection='column' justifyContent='center'>
          <InputComponent
            title='List Name'
            name='name'
            value={state.name}
            change={handleChange}
          />
          <InputComponent
            title='List Description'
            name='description'
            value={state.description}
            change={handleChange}
          />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box display='flex' flexDirection='column'>
              {state.tasks.map((task) => {
                return (
                  <TasksInput
                    id={task.id}
                    change={handleTaskChange}
                    key={task.id}
                  />
                );
              })}
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
            <Button
              variant='text'
              color='primary'
              style={{ backgroundColor: 'transparent' }}
              onClick={(e) => {
                submit(state);
                e.preventDefault();
                clearForm();
              }}
            >
              Submit
            </Button>
            <Container maxWidth='xs' width='25%' disableGutters>
              <IconButton
                disableTouchRipple
                style={{ backgroundColor: 'transparent', outlineStyle: 'none' }}
                size='small'
                p={0}
                onClick={addMoreInputs}
              >
                <AddIcon color='secondary' />
              </IconButton>
              <IconButton>
                <RemoveIcon color='secondary' />
              </IconButton>
            </Container>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Form;
