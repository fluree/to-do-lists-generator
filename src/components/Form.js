import React, { useState } from 'react';
import InputComponent from './InputComponent';
import TasksInput from './TasksInput';

function Form({ submit }) {
  const [state, setState] = useState({
    name: '',
    description: '',
    tasks: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleTaskChange(index, task) {
    let newTasks = state.tasks;
    newTasks[index] = task;
    setState({ ...state, tasks: newTasks });
  }
  return (
    <form>
      <div>
        <InputComponent
          title='List Name'
          name='name'
          value={state.name}
          change={handleChange}
        />
      </div>
      <div>
        <InputComponent
          title='List Description'
          name='description'
          value={state.description}
          change={handleChange}
        />
      </div>
      <TasksInput change={handleTaskChange} index={0} />
      <button
        onClick={(e) => {
          submit(state);
          e.preventDefault();
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
