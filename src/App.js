import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [assigned, setAssign] = useState(props.assigned);
  const [filter, setFilter] = useState('All');

  //tasks are marked as complete or not
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  //tasks are deleted
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        assigned={task.assigned}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function addTask(name) {
    const newTask = { id: 'todo' + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function addName(assigned) {
    const newAssignee = { id: 'assignee' + nanoid(), assigned: assigned };
    console.log(assigned);
    setAssign(...assigned, newAssignee);
    console.log(newAssignee);
  }

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className=''>
      <h1>TodoLists</h1>
      <Form addTask={addTask} addName={addName} />
      <div className=''>{filterList}</div>
      <h2 id='list-heading' tabIndex='-1' ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul role='list' className='' aria-labelledby='list-heading'>
        {taskList}
      </ul>
    </div>
  );
}

export default App;
