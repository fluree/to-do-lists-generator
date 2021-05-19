import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 34,
    height: 20,
    padding: 2,
    display: 'flex',
  },
  switchBase: {
    padding: 5,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function FormSwitch({ onClick }) {
  const [toggle, setToggle] = useState(false);

  const triggerToggle = () => {
    setToggle(!toggle);
  };
  return (
    <Typography component='div' align='center' display='block'>
      <Grid component='label' container alignItems='center' spacing={1}>
        <Grid item>Hide</Grid>
        <Grid item>
          <AntSwitch
            variant='text'
            color='primary'
            checked={toggle}
            onClick={onClick}
            onChange={triggerToggle}
            name='FormToggle'
          />
        </Grid>
        <Grid item>Show</Grid>
      </Grid>
    </Typography>
  );
}
export default FormSwitch;
