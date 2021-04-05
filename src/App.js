import React from 'react';
import Form from './components/Form';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import ListContainer from './components/ListContainer';
import Blue_Brandmark from './Images/Blue_Brandmark.png';

function App() {
  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={8}>
        <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
          <h1>TodoLists</h1>
          <img
            src={Blue_Brandmark}
            alt='Fluree Yeti logo'
            style={{ width: '48px', height: '48px' }}
          />
        </Box>
        <Form />
      </Grid>
      <Grid item xs={8}>
        <ListContainer></ListContainer>
      </Grid>
    </Grid>
  );
}

export default App;
