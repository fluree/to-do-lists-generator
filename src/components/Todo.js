import React from 'react';
import Task from './Task';
import { Box } from '@material-ui/core';

export default function Todo(props) {
  function handleSubmit(task) {
    props.editTask(task);
  }

  function handleDeletion(task) {
    props.deleteTask(task);
  }

  const viewTemplate = (
    <Box display='flex' alignItems='center' flexDirection='column' p={2}>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>
      {props.tasks.map((task) => {
        return (
          <Task
            handleSubmit={handleSubmit}
            handleDeletion={handleDeletion}
            id={task.id}
            task={task}
            key={task.id}
          />
        );
      })}
    </Box>
  );

  return <li className=''>{viewTemplate}</li>;
}
