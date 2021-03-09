import React, { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import button from '../createMuiTheme/overrides/button';

function Form(props) {
  const data = useState(props.inputData);
  const [state, setState] = useState({
    listName: '',
    listDescription: '',
    data,
  });

  // function to grab input data
  function grabInputData(inputData) {
    inputData = [state.task, state.assignee, state.email];
  }

  // action to submit input values
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(state.listName, state.listDescription, data);
    setState({
      listName: '',
      listDescription: '',
      data,
    });
    // postData();
  };

  // action to handle changes
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // // action to send data to flureedb api
  // const postData = async () => {
  //   let taskItem = {
  //     _id: 'tasks',
  //     task: state.task,
  //     completed: false,
  //     assignedTo: null,
  //   };
  //   await axios.post(`http://localhost:8080/fdb/todolist/one/query`, {
  //     select: ['*'],
  //     where: '',
  //   });
  //   await axios
  //     .post(`http://localhost:8080/fdb/todolist/one/transact`, [taskItem])
  //     .then(() => {
  //       console.log('Post successful!');
  //     })
  //     .catch(() => {
  //       console.log('Oops, request failed!');
  //     });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className=''>
        <label htmlFor='new-todo-input' className=''>
          Add a new List
        </label>
      </h2>
      <div>
        <label>
          List Name:
          <input
            type='text'
            id='new-list-name-input'
            className='border-2 rounded-md border-gray-400'
            name='listName'
            autoComplete='off'
            value={state.listName}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type='text'
            id='new-list-description-input'
            className='border-2 rounded-md border-gray-400'
            name='listDescription'
            autoComplete='off'
            value={state.listDescription}
            onChange={handleChange}
          />
        </label>
      </div>
      <Input grabInputData={grabInputData} />
      <Input grabInputData={grabInputData} />
      <Input grabInputData={grabInputData} />
      <button type='submit' className={button.containedSecondary}>
        Submit
      </button>
    </form>
  );
}

export default Form;
