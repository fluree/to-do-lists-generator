import React, { useState } from 'react';
import Task from './Task';

export default function Todo(props) {
  const [state, setState] = useState({ newName: '' });
  // const editFieldRef = useRef(null);
  // const editButtonRef = useRef(null);
  // const wasEditing = usePrevious(isEditing);

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.tasks.id, state.newName);
    setState({ newName: '' });
  }

  const viewTemplate = (
    <div className=''>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>

      {props.tasks.map((task) => {
        return <Task handleSubmit={handleSubmit} task={task} key={task.id} />;
      })}
    </div>
  );

  return <li className=''>{viewTemplate}</li>;
}
