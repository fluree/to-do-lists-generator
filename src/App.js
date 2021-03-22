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
    setLists(response.data);
  };

  useEffect(() => {
    fetchListData();
  }, []);

  function addList({ name, description, tasks }) {
    const newList = {
      name: name,
      description: description,
      id: nanoid(),
      tasks: tasks,
    };

    let transactLoad = [
      {
        _id: 'list$sent' + nanoid(),
        tasks: [newList.tasks],
        name: newList.name,
        description: newList.description,
      },
    ];

    tasks.forEach((task, index) => {
      transactLoad.push(
        {
          _id: 'task$New' + nanoid(),
          name: task[index],
          isCompleted: false,
          assignedTo: [`'assignee/name', '${task.assignedTo}'`],
        },
        {
          _id: 'assignee$assignee_' + nanoid(),
          name: task.assignedTo,
          email: task.email,
        }
      );
    });

    setLists((lists) => [...lists, newList]);
    debugger;
    const sendListData = async () => {
      let transactResponse = await axios.post(
        `http://localhost:8080/fdb/todo/lists/transact`,
        transactLoad
      );
      debugger;
      setLists(transactResponse.data);
      console.log(transactResponse.data);
    };
    sendListData();
  }

  const handleSubmit = (list) => {
    addList(list);
    console.log(list);
  };

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
