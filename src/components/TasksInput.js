import React, { useState, useContext, useEffect } from 'react';
import { ListContext } from '../ListContext';
import InputComponent from './InputComponent';
import { Box } from '@material-ui/core';
import AssigneeSelect from './AssigneeSelect';

function TasksInput({ task }) {
  const [newTaskState, setNewTaskState] = useState(task);

  const taskState = useContext(ListContext);
  const { handleTaskChange } = taskState; //the context that this component is using

  function sendTasksToParent(e) {
    //sends tasks array to parent
    const { name, value } = e.target;
    setNewTaskState({ ...newTaskState, [name]: value }); //sets the new state of the tasks
  }

  useEffect(() => {
    handleTaskChange(newTaskState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTaskState]);

  return (
    <Box display='flex' flexDirection='column'>
      <InputComponent
        title='Task'
        type='text'
        name='task'
        value={newTaskState.task}
        change={sendTasksToParent}
      />
      <AssigneeSelect
        assignedTo={newTaskState.assignedTo}
        change={sendTasksToParent}
      />
    </Box>
  );
}

export default TasksInput;
