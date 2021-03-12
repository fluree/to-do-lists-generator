import React, { useState, useRef, useEffect } from 'react';
import Task from './Task';

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

export default function Todo(props) {
  const [state, setState] = useState({ newName: '' });
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  // const wasEditing = usePrevious(isEditing);

  // function handleChange(e) {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   props.editTask(props.tasks.id, state.newName);
  //   setState({ newName: '' });
  // }

  // const editingTemplate = (
  //   // <form className='' onSubmit={handleSubmit}>
  //   //   <div className=''>
  //   //     <label className='' htmlFor={props.tasks.id}>
  //   //       New name for {props.tasks.task}
  //   //       <input
  //   //         id={props.tasks.id}
  //   //         className=''
  //   //         type='text'
  //   //         name='newName'
  //   //         value={state.newName}
  //   //         onChange={handleChange}
  //   //         ref={editFieldRef}
  //   //       />
  //   //       <div className=''>
  //   //         <button
  //   //           type='button'
  //   //           className=''
  //   //           onClick={() => setEditing(false)}
  //   //         >
  //   //           Cancel
  //   //           <span className='hidden'>renaming {props.task}</span>
  //   //         </button>
  //   //         <button type='submit' className=''>
  //   //           Save
  //   //           <span className='hidden'>new name for {props.task}</span>
  //   //         </button>
  //   //       </div>
  //   //     </label>
  //   //   </div>
  //   // </form>
  // );
  const viewTemplate = (
    <div className=''>
      <h2>{props.name}</h2>
      <h3>{props.description}</h3>

      {props.tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );

  // useEffect(() => {
  //   if (!wasEditing && isEditing) {
  //     editFieldRef.current.focus();
  //   }
  //   if (wasEditing && !isEditing) {
  //     editButtonRef.current.focus();
  //   }
  // }, [wasEditing, isEditing]);

  return <li className=''>{viewTemplate}</li>;
}
