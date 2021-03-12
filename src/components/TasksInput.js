import React, { useState } from 'react';
import InputComponent from './InputComponent';
import { nanoid } from 'nanoid';

function TasksInput({ change, index }) {
  const [state, setState] = useState({
    id: `task-${nanoid()}`,
    completed: false,
    task: '',
    assignee: '',
    email: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    change(index, state);
  }
  return (
    <div>
      <div>
        <InputComponent
          title='Task'
          name='task'
          value={state.task}
          change={handleChange}
        />
      </div>
      <div>
        <InputComponent
          title='Assignee'
          name='assignee'
          value={state.assignee}
          change={handleChange}
        />
      </div>
      <div>
        <InputComponent
          title='Email'
          name='email'
          value={state.email}
          change={handleChange}
        />
      </div>
    </div>
  );
}

export default TasksInput;
