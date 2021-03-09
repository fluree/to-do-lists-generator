import React, { useState } from 'react';
import { nanoid } from 'nanoid';

function Input(props) {
  const [state, setState] = useState({
    task: '',
    assignee: '',
    email: '',
  });

  // action to handle input value changes
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    props.grabInputData(state.task, state.assignee, state.email);
  };

  return (
    <div>
      <label>
        Task:
        <input
          type='text'
          id={'new-todo-input' + nanoid()}
          className='border-2 rounded-md border-gray-400'
          name='task'
          autoComplete='off'
          value={state.task}
          onChange={handleChange}
        />
      </label>
      <label>
        Assignee:
        <input
          type='text'
          id={'new-assignee-input' + nanoid()}
          className='border-2 rounded-md border-gray-400'
          name='assignee'
          autoComplete='off'
          value={state.assignee}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type='text'
          id={'new-email-input' + nanoid()}
          className='border-2 rounded-md border-gray-400'
          name='email'
          autoComplete='off'
          value={state.email}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default Input;
