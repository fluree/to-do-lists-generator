import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

const ListContext = React.createContext({});

const ListProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [inputState, setInputState] = useState({
    name: '',
    description: '',
    tasks: [
      {
        id: `task-${nanoid()}`,
        completed: false,
        task: '',
        assignedTo: '',
        email: '',
        newAssignedTo: '',
      },
    ],
  });
  const [userIsNew, setNewUser] = useState(false);
  const [users, setUsers] = useState([]);

  //this handles the changes for the name and description inputs in the form component
  function handleChange(e) {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  }

  //this handles the changes for the inputs in the TasksInput component
  function handleTaskChange(task) {
    let newTasks = inputState.tasks;
    const index = newTasks.findIndex((newTask) => newTask.id === task.id);
    newTasks[index] = task;
    setInputState({ ...inputState, tasks: newTasks });
  }

  //this adds more TaskInputs when the + button is pressed
  function addMoreInputs() {
    let moreTasks = inputState.tasks;
    moreTasks.push({
      id: `task-${nanoid()}`,
      completed: false,
      task: '',
      assignedTo: '',
      email: '',
    });
    setInputState({ ...inputState, tasks: moreTasks });
  }

  //this removes a TaskInput when the - button is pressed
  function removeInputs() {
    let currentTasks = inputState.tasks;
    currentTasks.pop();
    setInputState({ ...inputState, tasks: currentTasks });
  }

  //this clears the form when after the submit button is pressed
  function clearForm() {
    setInputState({
      name: '',
      description: '',
      tasks: [
        {
          id: `task${'-' + Math.floor(Math.random() * 10 + 1)}`,
          completed: false,
          task: '',
          assignedTo: '',
          email: '',
        },
      ],
    });
  }

  // load all the assignee data from fdb on render
  const loadAssignedToData = async () => {
    const response = await axios.post(
      `http://localhost:8080/fdb/todo/lists/query`,
      {
        select: ['assignee/_id', 'assignee/email', 'assignee/name'],
        from: 'assignee',
        opts: {
          compact: true,
          orderBy: ['ASC', '_id'],
        },
      }
    );
    setUsers(response.data);
  };

  //calls the assignee data function
  useEffect(() => {
    loadAssignedToData();
  }, []);

  // fetches all the list data in the fdb
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

  //calls the fetching list data function on render
  useEffect(() => {
    fetchListData();
  }, []);

  //adds a new list to the DB
  function addList({ name, description, tasks }) {
    const newList = {
      _id: `list${'$' + Math.floor(Math.random() * 10 + 1)}`,
      name,
      description,
      tasks: [],
    };

    tasks.forEach((task, index) => {
      let userId = task.assignedTo;
      let isAssignedTo = userId;
      if (userId === 'new') {
        userId = `assignee$${index}`;
        isAssignedTo = {
          _id: userId,
          name: task.newAssignedTo,
          email: task.email,
        };
      }

      const newTask = {
        _id: `task$${index}`,
        name: task.task,
        isCompleted: task.completed,
        assignedTo: isAssignedTo,
      };
      newList.tasks.push(newTask);
    });

    let transactLoad = [newList];

    let sendListData = async () => {
      let transactResponse = await axios.post(
        `http://localhost:8080/fdb/todo/lists/transact`,
        transactLoad
      );
      if (transactResponse.status === 200) {
        const _id = transactResponse?.data?.tempids['list$1'];

        const updatedTasks = newList.tasks.map((task) => {
          if (!task.assignedTo.email) {
            const actualUser = users.filter(
              (user) => user._id === task.assignedTo
            );
            task.assignedTo = actualUser[0];
          }
          return task;
        });
        newList.tasks = updatedTasks;
        setLists((lists) => [...lists, { ...newList, _id }]);
      }
    };
    sendListData();
  }

  //calls the addList function on submission
  const handleSubmit = (list) => {
    addList(list);
  };

  //tasks are deleted
  function deleteTask(chosenTask) {
    const remainingTasks = lists.map((list) => {
      const index = list.tasks.findIndex((task) => task._id === chosenTask._id);
      let deleteTaskFluree = async () => {
        await axios.post(`http://localhost:8080/fdb/todo/lists/transact`, [
          {
            _id: chosenTask._id,
            _action: 'delete',
          },
        ]);
      };
      if (index >= 0) {
        delete list.tasks[index];
        deleteTaskFluree();
      }
      return list;
    });

    setLists(remainingTasks);
  }

  //tasks are edited
  async function editTask(newTask) {
    const editedTaskList = await lists.map((list) => {
      const index = list.tasks.findIndex((task) => task._id === newTask._id);
      let editTaskName = async () => {
        await axios.post(`http://localhost:8080/fdb/todo/lists/transact`, [
          {
            _id: newTask._id,
            'task/name': newTask.name,
          },
        ]);
      };
      if (index >= 0) {
        list.tasks[index] = newTask;
        editTaskName();
      }
      return list;
    });
    setLists(editedTaskList);
  }

  return (
    <ListContext.Provider
      value={{
        lists,
        deleteTask,
        editTask,
        handleSubmit,
        addList,
        inputState,
        setInputState,
        users,
        setUsers,
        userIsNew,
        setNewUser,
        handleChange,
        handleTaskChange,
        addMoreInputs,
        removeInputs,
        clearForm,
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export { ListProvider, ListContext };
