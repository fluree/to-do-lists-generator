import React from 'react';
import Form from './components/Form';
import { Grid } from '@material-ui/core';
import ListContainer from './components/ListContainer';

function App() {
  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={8}>
        <h1>TodoLists</h1>
        <Form />
      </Grid>
      <Grid item xs={8}>
        <ListContainer></ListContainer>
      </Grid>
    </Grid>
  );
}

export default App;
