import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const handleSubmit = (list) => {
    console.log(list);
    addList(list);
  };

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
  //tasks are edited
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, task: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        name={task.name}
        description={task.description}
        id={task.id}
        task={task.task}
        completed={task.completed}
        assignee={task.assignee}
        email={task.email}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((task) => (
    <FilterButton
      key={task}
      name={task}
      isPressed={task === filter}
      setFilter={setFilter}
    />
  ));

  function addList({ name, description, task, assignee, email }) {
    const newList = {
      name: name,
      description: description,
      id: 'todo' + nanoid(),
      task: task,
      completed: false,
      assignee: assignee,
      email: email,
    };
    setTasks([...tasks, newList]);
  }

  return (
    <div className=''>
      <h1>TodoLists</h1>
      <Form submit={handleSubmit} />
      <div className=''>{filterList}</div>
      <ul role='list' className='' aria-labelledby='list-heading'>
        {taskList}
      </ul>
    </div>
  );
}

export default App;
