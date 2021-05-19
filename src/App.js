import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import themeObject from '@fluree/mui-theme';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import FormContainer from './components/FormContainer';
import ListContainer from './components/ListContainer';
import Blue_Brandmark from './Images/Blue_Brandmark.png';

function App() {
  const flureeTheme = createMuiTheme(themeObject);
  return (
    <ThemeProvider theme={flureeTheme}>
      <Grid container alignItems='center' justify='center'>
        <Grid item xs={8}>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-evenly'
            alignItems='baseline'
          >
            <Typography variant='h5' component='h5'>
              To do Lists
            </Typography>
            <img
              src={Blue_Brandmark}
              alt='Fluree Yeti logo'
              style={{ width: '48px', height: '48px' }}
            />
          </Box>
          <FormContainer />
        </Grid>
        <Grid item xs={8}>
          <ListContainer></ListContainer>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
