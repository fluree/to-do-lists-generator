import React, { useState } from 'react';
import InputComponent from './InputComponent';

function Form({ submit }) {
  const [state, setState] = useState({
    name: '',
    description: '',
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
