import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import InputComponent from './InputComponent';

function Task({ task, handleSubmit }) {
  const [isEditing, setEditing] = useState(false);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);
  const [state, setState] = useState('');

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <>
      <div className=''>
        <input
          id={task.id}
          type='checkbox'
          defaultChecked={task.completed}
          onChange={() => task.toggleTaskCompleted(task.id)}
        />
        <label className='' htmlFor={task.id}>
          {task.task}
        </label>
        <label id={'assignee-' + nanoid()} className=''>
          {task.assignee}
        </label>
        <label id={'email-' + nanoid()} className=''>
          {task.email}
        </label>
      </div>
      <div className=''>
        <button
          type=''
          className=''
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className='hidden'>{task.task}</span>
        </button>
        <button
          type='button'
          className=''
          onClick={() => task.deleteTask(task.id)}
        >
          Delete <span className='hidden'>{task.task}</span>
        </button>
      </div>
      {isEditing && (
        <form className='' onSubmit={handleSubmit}>
          <div className=''>
            <label className='' htmlFor={task.id}>
              New name for {task.task}
              <InputComponent
                id={task.id}
                className=''
                type='text'
                name='newName'
                value={state.newName}
                onChange={handleChange}
                ref={editFieldRef}
              />
              <div className=''>
                <button
                  type='button'
                  className=''
                  onClick={() => setEditing(false)}
                >
                  Cancel
                  <span className='hidden'>renaming {task.task}</span>
                </button>
                <button type='submit' className=''>
                  Save
                  <span className='hidden'>new name for {task.task}</span>
                </button>
              </div>
            </label>
          </div>
        </form>
      )}
    </>
  );
}
export default Task;
