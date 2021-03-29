import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListContext = React.createContext({});

const ListProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [inputState, setInputState] = useState({
    name: '',
    description: '',
    tasks: [
      {
        id: `task${'-' + Math.floor(Math.random() * 10 + 1)}`,
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

  async function handleInputChange(e) {
    const { name, value } = e.target;

    setInputState({
      ...inputState,
      [name]: value,
    });

    // if (userIsNew) {
    //   const newAssigneeId = await createNewUser();
    // }

    // change({ ...state, [name]: value });
  }

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
      id: `task${'-' + Math.floor(Math.random() * 10 + 1)}`,
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
    inputState({ ...inputState, tasks: currentTasks });
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
      const newTask = {
        _id: `task$${index}`,
        name: task.task,
        isCompleted: task.completed,
        assignedTo: {
          _id: `assignee$${index}`,
          name: task.assignedTo,
          email: task.email,
        },
      };
      newList.tasks.push(newTask);
    });

    let transactLoad = [newList];

    // setLists((lists) => [...lists, newList]);
    const sendListData = async () => {
      let transactResponse = await axios.post(
        `http://localhost:8080/fdb/todo/lists/transact`,
        transactLoad
      );
      if (transactResponse.status === 200) {
        const _id = transactResponse?.data?.tempids['list$1'];

        //I've moved setLists() down here
        setLists((lists) => [...lists, { ...newList, _id }]);
      }
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

  return (
    <ListContext.Provider
      value={{
        lists,
        deleteTask,
        editTask,
        handleSubmit,
        addList,
        inputState,
        users,
        setUsers,
        userIsNew,
        setNewUser,
        handleChange,
        handleInputChange,
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
