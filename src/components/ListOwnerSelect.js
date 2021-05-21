import React, { useState, useEffect, useContext } from 'react';
import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { ListContext } from '../ListContext';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

function ListOwnerSelect({ listOwner, change }) {
  const listOwnerState = useContext(ListContext);
  const {
    userIsNew,
    setNewUser,
    owners,
    handleNewOwnerSubmit,
    handleTaskChange,
  } = listOwnerState;
  const [newOwnerState, setNewOwner] = useState({
    email: '',
    newOwner: '',
  });
  const [chosenOwner, setChosenOwner] = useState(listOwner);

  function handleOwnerSelection(e) {
    const { name, value } = e.target;
    setChosenOwner({
      ...chosenOwner,
      [name]: value,
    });
    change(e);
  }

  useEffect(() => {
    handleTaskChange(chosenOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenOwner]);

  function handleNewOwnerChange(e) {
    const { name, value } = e.target;
    setNewOwner({ ...newOwnerState, [name]: value });
  }

  function clearOwnerSelection() {
    setChosenOwner('');
  }

  return (
    <Box display='flex' flexDirection='column'>
      <InputLabel variant='filled' id='select-label'>
        Select List Owner
      </InputLabel>
      <Select
        title='listOwner'
        id='select-owner'
        name='listOwner'
        value={chosenOwner.listOwner || ''}
        type='select'
        onChange={handleOwnerSelection}
        variant='filled'
      >
        {owners.map((owner, id) => (
          <MenuItem
            key={id}
            value={owner._id}
            onClick={() => setNewUser(false)}
          >
            {owner.username}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setNewUser(true)} value='new'>
          New List Owner
        </MenuItem>
      </Select>
      {userIsNew && (
        <>
          <Box display='flex' flexDirection='column'>
            <InputComponent
              title='New Assignee'
              type='text'
              name='newOwner'
              value={newOwnerState.newOwner}
              change={handleNewOwnerChange}
            />
            <InputComponent
              title='Email'
              type='text'
              name='email'
              value={newOwnerState.email}
              change={handleNewOwnerChange}
            />
          </Box>
          <Button
            variant='text'
            color='secondary'
            style={{ backgroundColor: 'transparent' }}
            onClick={(e) => {
              handleNewOwnerSubmit(newOwnerState);
              e.preventDefault();
              clearOwnerSelection();
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

export default ListOwnerSelect;
