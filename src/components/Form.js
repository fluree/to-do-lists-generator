import React, { useContext } from 'react';
import { ListContext } from '../ListContext';
import InputComponent from './InputComponent';
import TasksInput from './TasksInput';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

function Form({ submit }) {
  const inputComponentState = useContext(ListContext);

  const {
    inputState,
    handleChange,
    handleTaskChange,
    addMoreInputs,
    removeInputs,
    clearForm,
  } = inputComponentState;

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <form style={{ minWidth: '18rem' }} autoComplete='off'>
        <Box display='flex' flexDirection='column' justifyContent='center'>
          <InputComponent
            title='List Name'
            name='name'
            value={inputState.name}
            change={handleChange}
          />
          <InputComponent
            title='List Description'
            name='description'
            value={inputState.description}
            change={handleChange}
          />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box display='flex' flexDirection='column'>
              {inputState.tasks.map((task) => {
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
                submit(inputState);
                e.preventDefault();
                clearForm();
              }}
            >
              Submit
            </Button>
            <Container
              maxWidth='xs'
              disableGutters
              style={{ width: '25%', margin: '0' }}
            >
              <IconButton
                disableTouchRipple
                style={{
                  backgroundColor: 'transparent',
                  outlineStyle: 'none',
                }}
                size='small'
                p={0}
                onClick={addMoreInputs}
              >
                <AddIcon color='secondary' />
              </IconButton>
              <IconButton
                disableTouchRipple
                style={{
                  backgroundColor: 'transparent',
                  outlineStyle: 'none',
                }}
                size='small'
                p={0}
                onClick={removeInputs}
              >
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
