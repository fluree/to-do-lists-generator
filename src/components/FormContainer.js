import React, { useState } from 'react';
import Form from './Form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormSwitch from './FormSwitch';

function FormContainer() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Typography component='div'>
      <Grid direction='column' justify='center' alignItems='center' container>
        <FormSwitch onClick={() => setShowForm(!showForm)} />
      </Grid>
      <Grid item>{showForm ? <Form /> : null}</Grid>
    </Typography>
  );
}

export default FormContainer;
