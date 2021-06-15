import React from 'react';
import Task from './Task';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

export default function Todo(props) {
  function handleDeletion(task) {
    props.deleteTaskFromFluree(task);
  }

  const viewTemplate = (
    <Box display='flex' alignItems='center' flexDirection='column' p={2}>
      <Typography variant='subtitle1' component='h2'>
        {props.name}
      </Typography>
      <Typography variant='subtitle2' component='h3'>
        {props.description}
      </Typography>

      {props.tasks.map((task, index) => {
        return (
          <Task
            handleDeletion={handleDeletion}
            id={task.id}
            task={task}
            key={index}
          />
        );
      })}
    </Box>
  );

  return <li className=''>{viewTemplate}</li>;
}
