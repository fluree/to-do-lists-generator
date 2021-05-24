import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import usersAuth from '../data/usersAuth';

const useStyles = makeStyles({
  root: {
    flexGrow: 3,
    width: '100%',
  },
});

const defaultTabs = [
  { name: 'rootUser', href: '#', current: true },
  { name: 'Tucca', href: '#', current: false },
  { name: 'Isabel', href: '#', current: false },
  { name: 'Jane', href: '#', current: false },
  { name: 'Flor', href: '#', current: false },
  { name: 'Mannie', href: '#', current: false },
];

export default function CenteredTabs({ handleUserChange, selectedUser }) {
  const classes = useStyles();
  const [tabs, setTabs] = useState(defaultTabs);

  useEffect(() => {
    const newTabs = tabs.map((userTab) => ({
      ...userTab,
      current: selectedUser.name === userTab.name,
    }));
    setTabs(newTabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={classes.root}>
      <Tabs
        value={selectedUser.name}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            label={tab.name}
            value={tab.name}
            onClick={(event) => handleUserChange(event, tab.name)}
          />
        ))}
      </Tabs>
    </Paper>
  );
}
