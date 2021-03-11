import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [state, setState] = useState({ newName: '' });
  const [isEditing, setEditing] = useState(false);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, state.newName);
    setEditing(false);
    setState({ newName: '' });
  }

  const editingTemplate = (
    <form className='' onSubmit={handleSubmit}>
      <div className=''>
        <label className='' htmlFor={props.id}>
          New name for {props.task}
        </label>
        <input
          id={props.id}
          className=''
          type='text'
          name='newName'
          value={state.newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className=''>
        <button type='button' className='' onClick={() => setEditing(false)}>
          Cancel
          <span className='hidden'>renaming {props.task}</span>
        </button>
        <button type='submit' className=''>
          Save
          <span className='hidden'>new name for {props.task}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className=''>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>
      <div className=''>
        <input
          id={props.id}
          type='checkbox'
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className='' htmlFor={props.id}>
          {props.task}
        </label>
        <label id={'assignee-' + nanoid()} className=''>
          {props.assignee}
        </label>
        <label id={'email-' + nanoid()} className=''>
          {props.email}
        </label>
      </div>
      <div className=''>
        <button
          type=''
          className=''
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className='hidden'>{props.task}</span>
        </button>
        <button
          type='button'
          className=''
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className='hidden'>{props.task}</span>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className=''>{isEditing ? editingTemplate : viewTemplate}</li>;
}
