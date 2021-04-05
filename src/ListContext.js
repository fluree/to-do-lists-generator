import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

//List Context holds all the functionality that will issue transactions and queries from the Fluree DB

const ListContext = React.createContext({});

const ListProvider = (props) => {
  // initial state of the lists array, custom hook to set the lists each time the hook is called
  const [lists, setLists] = useState([]);

  //this useState hook and variable hold my initial value and the custom hook to update the value
  const [inputState, setInputState] = useState({
    name: '',
    description: '',
    tasks: [
      {
        id: `task-${nanoid()}`,
        isCompleted: false,
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

  //load all the assignee data from fdb on render to propagate the "assignee" Select
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
    //use the custom setLists hook to propagate list data pulled from Fluree to the Todo and Task components
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
    //for each task input information submitted loop through to set all the required predicate information
    tasks.forEach((task, index) => {
      let userId = task.assignedTo; //sets userId to the assignee/_id we queried from Fluree on first render
      let isAssignedTo = userId; //
      if (userId === 'new') {
        //if the _id is 'new' meaning new assignee(ie not a value we queired from Fluree) then execute code below
        userId = `assignee$${index}`; //creates a temporary id for the new assignee
        isAssignedTo = {
          _id: userId, // temporar id goes here
          name: task.newAssignedTo, //the first name of the new assignee
          email: task.email, //the email of the new assignee
        };
      } //All existing assignees already have their name and email info in Fluree, so we issue the transaction with their if values recieved in the initial query

      const newTask = {
        // creates a transaction using FlureeQL syntax to send over the new list data to Fluree
        _id: `task$${index}`, //temporary id for the new list data
        name: task.task, //name of the task
        isCompleted: task.completed, //whether the task is completed (boolean)
        assignedTo: isAssignedTo, //this predicate, in the task collection, is of special type ref so it takes the assigne/_id as parameter to reference the assignee data in the assignee collection belonging to that _id value
      };
      newList.tasks.push(newTask); //push each new task into the tasks array in the new list object
    });

    let transactLoad = [newList]; //set the transactLoad to the newList array for use in the transaction

    let sendListData = async () => {
      //hold the axios API request
      let transactResponse = await axios.post(
        `http://localhost:8080/fdb/todo/lists/transact`, //place your URL followed by this structure: /fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/transact
        transactLoad //this is the body that contains the list data in FlureeQL
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

      let taskChangeTransact = [
        {
          _id: newTask._id,
          'task/name': newTask.name,
          'task/isCompleted': newTask.isCompleted,
        },
      ];

      let editTaskProps = async () => {
        await axios.post(
          `http://localhost:8080/fdb/todo/lists/transact`,
          taskChangeTransact
        );
      };
      if (index >= 0) {
        list.tasks[index] = newTask;
        editTaskProps();
      }
      return list;
    });
    setLists(editedTaskList);
  }

  return (
    <ListContext.Provider //this provides all the state and functionality to every component within in it
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
