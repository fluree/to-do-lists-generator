import React, { useState, useEffect, useContext } from 'react';
// import InputComponent from './InputComponent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { ListContext } from '../ListContext';
import { Box } from '@material-ui/core';
// import { Button } from '@material-ui/core';

function ListOwnerSelect({ listOwner, change }) {
  const listOwnerState = useContext(ListContext);
  const { owners, handleTaskChange } = listOwnerState;
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
          <MenuItem key={id} value={owner._id}>
            {owner.username}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default ListOwnerSelect;
