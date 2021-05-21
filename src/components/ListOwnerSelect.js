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
    ownerIsNew,
    setNewListOwner,
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
            onClick={() => setNewListOwner(false)}
          >
            {owner.username}
          </MenuItem>
        ))}
        <MenuItem onClick={() => setNewListOwner(true)} value='new'>
          New List Owner
        </MenuItem>
      </Select>
      {ownerIsNew && (
        <>
          <Box display='flex' flexDirection='column'>
            <InputComponent
              title='New Owner'
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
              setNewListOwner(false);
            }}
          >
            Add List Owner
          </Button>
        </>
      )}
    </Box>
  );
}

export default ListOwnerSelect;
