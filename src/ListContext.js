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

  function handleChange(e) {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  }

  function handleTaskChange(task) {
    let newTasks = inputState.tasks;
    const index = newTasks.findIndex((newTask) => newTask.id === task.id);
    newTasks[index] = task;
    setInputState({ ...inputState, tasks: newTasks });
  }

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

  function removeInputs() {
    let currentTasks = inputState.tasks;
    currentTasks.pop();
    setInputState({ ...inputState, tasks: currentTasks });
  }

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

  useEffect(() => {
    loadAssignedToData();
  }, []);

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

    const sendListData = async () => {
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

  const handleSubmit = (list) => {
    addList(list);
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
    const editedTaskList = await lists.map((list) => {
      const index = list.tasks.findIndex((task) => task.id === newTask.id);
      if (index) {
        list.tasks[index] = newTask;
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
