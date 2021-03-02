import React, { useState } from 'react';

function Form(props) {
  const [state, setState] = useState({ task: '', assignee: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(state.task, state.assignee);
    setState({ task: '', assignee: '' });
    console.log(state.assignee);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className=''>
        <label htmlFor='new-todo-input' className=''>
          Add a task and assign it to a person
        </label>
      </h2>
      <div>
        <label>
          Task: {''}
          <input
            type='text'
            id='new-todo-input'
            className='border-2 rounded-md border-gray-400'
            name='task'
            autoComplete='off'
            value={state.task}
            onChange={handleChange}
          />
        </label>
        <label>
          Assignee: {''}
          <input
            type='text'
            id='new-assignee-input'
            className='border-2 rounded-md border-gray-400'
            name='assignee'
            autoComplete='off'
            value={state.assignee}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type='submit' className=''>
        Add
      </button>
    </form>
  );
}

export default Form;
