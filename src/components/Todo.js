import React from 'react';
import Task from './Task';
import { Box } from '@material-ui/core';

export default function Todo(props) {
  function handleDeletion(task) {
    props.deleteTask(task);
  }

  const viewTemplate = (
    <Box display='flex' alignItems='center' flexDirection='column' p={2}>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>

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
