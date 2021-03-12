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
  const [lists, setLists] = useState(props.data);
  const [filter, setFilter] = useState('All');

  const handleSubmit = (list) => {
    console.log(list);
    addList(list);
  };

  //tasks are marked as complete or not
  function toggleTaskCompleted(id) {
    const updatedTasks = lists.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setLists(updatedTasks);
  }
  //tasks are deleted
  function deleteTask(id) {
    const remainingTasks = lists.filter((task) => id !== task.id);
    setLists(remainingTasks);
  }
  //tasks are edited
  function editTask(id, newName) {
    const editedTaskList = lists.map((task) => {
      if (id === task.id) {
        return { ...task, task: newName };
      }
      return task;
    });
    setLists(editedTaskList);
  }

  const taskList = lists.map((list) => (
    <Todo
      name={list.name}
      description={list.description}
      id={list.id}
      tasks={list.tasks}
      key={list.id}
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

  function addList({ name, description, tasks }) {
    const newList = {
      name: name,
      description: description,
      id: 'todo' + nanoid(),
      tasks: tasks,
    };
    setLists((lists) => [...lists, newList]);
    console.log(lists);
    setLists('');
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
