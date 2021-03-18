import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import List from '@material-ui/core/List';
import { Grid } from '@material-ui/core';

function App(props) {
  const [lists, setLists] = useState(props.data);

  const taskList = lists.map((list) => (
    <Todo
      name={list.name}
      description={list.description}
      id={list.id}
      tasks={list.tasks}
      key={list.id}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const handleSubmit = (list) => {
    addList(list);
  };

  function addList({ name, description, tasks }) {
    const newList = {
      name: name,
      description: description,
      id: 'todo' + nanoid(),
      tasks: tasks,
    };
    setLists((lists) => [...lists, newList]);
  }
  //tasks are deleted
  function deleteTask(chosenTask) {
    const remainingTasks = lists.map((list) => {
      const index = list.tasks.findIndex((task) => task.id === chosenTask.id);
      if (index) {
        delete list.tasks[index];
      }
      return list;
    });

    setLists(remainingTasks);
  }
  //tasks are edited
  async function editTask(newTask) {
    console.log(newTask);
    const editedTaskList = await lists.map((list) => {
      const index = list.tasks.findIndex((task) => task.id === newTask.id);
      if (index) {
        list.tasks[index] = newTask;
      }
      return list;
    });
    setLists(editedTaskList);
    console.log({ editedTaskList });
  }

  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={8}>
        <h1>TodoLists</h1>
        <Form submit={handleSubmit} />
      </Grid>
      <Grid item xs={8}>
        <List role='list' className='' aria-labelledby='list-heading'>
          {taskList}
        </List>
      </Grid>
    </Grid>
  );
}

export default App;
