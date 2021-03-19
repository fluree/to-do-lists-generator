import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import List from '@material-ui/core/List';
import { Grid } from '@material-ui/core';

function App() {
  const [lists, setLists] = useState([]);

  const fetchListData = async () => {
    let response = await axios.post(
      `http://localhost:8080/fdb/todo/lists/query`,
      {
        select: [
          '*',
          {
            tasks: [
              '*',
              {
                assignedTo: ['*'],
              },
            ],
          },
        ],
        from: 'list',
        opts: {
          compact: true,
          orderBy: ['ASC', '_id'],
        },
      }
    );
    console.log(response.data);
    setLists(response.data);
  };

  useEffect(() => {
    fetchListData();
  }, []);

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

  const TaskList = (props) => {
    const listItem = (
      <Todo
        name={props.list.name}
        description={props.list.description}
        id={props.list._id}
        tasks={props.list.tasks}
        key={props.list._id}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );

    return <div>{listItem}</div>;
  };
  console.log(lists);
  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={8}>
        <h1>TodoLists</h1>
        <Form submit={handleSubmit} />
      </Grid>
      <Grid item xs={8}>
        <List role='list' className='' aria-labelledby='list-heading'>
          {lists.map((list, i) => (
            <TaskList list={list} key={i} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default App;
