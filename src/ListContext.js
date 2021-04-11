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

  const baseURL = 'http://localhost:8080/fdb/test/one1/';

  //load all the assignee data from fdb on render to propagate the "assignee" Select
  const loadAssignedToData = async () => {
    const response = await axios.post(`${baseURL}query`, {
      select: ['_id', 'email', 'name'],
      from: 'assignee',
      opts: {
        compact: true,
        orderBy: ['ASC', '_id'],
      },
    });
    setUsers(response.data);
  };

  //calls the assignee data function
  useEffect(() => {
    loadAssignedToData();
  }, []);

  // fetches all the list data in the fdb
  const fetchListData = async () => {
    let response = await axios.post(`${baseURL}query`, {
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
    });
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
      let isAssignedTo = userId;
      if (userId === 'new') {
        //if the _id is 'new' meaning new assignee(ie not a value we queired from Fluree) then execute code below
        userId = `assignee$${index}`; //creates a temporary id for the new assignee
        isAssignedTo = {
          _id: userId, //temporar id goes here
          name: task.newAssignedTo, //the first name of the new assignee
          email: task.email, //the email of the new assignee
        };
      } //all existing assignees already have their name and email info in Fluree, so we issue the transaction with their if values recieved in the initial query

      const newTask = {
        //creates a transaction using FlureeQL syntax to send over the new list data to Fluree
        _id: `task$${index}`, //temporary id for the new list data
        name: task.task, //name of the task
        isCompleted: task.completed, //whether the task is completed (boolean)
        assignedTo: isAssignedTo, //this predicate, in the task collection, is of special type ref so it takes the assigne/_id as parameter to reference the assignee data in the assignee collection belonging to that _id value
      };
      newList.tasks.push(newTask); //push each new task into the tasks array in the new list object
    });

    let transactLoad = [newList]; //set the transactLoad to the newList array for use in the transaction

    let sendListData = async () => {
      //holds the axios API request
      let transactResponse = await axios.post(
        `${baseURL}transact`, //place your URL followed by this structure: /fdb/[NETWORK-NAME]/[DBNAME-OR-DBID]/transact
        transactLoad //this is the body that contains the list data in FlureeQL
      );
      if (transactResponse.status === 200) {
        const _id = transactResponse?.data?.tempids['list$1']; // Ask Andrew about this line

        //this filters through the tasks array and matches the assignee to the _ids recieved on render
        const updateTasksWithAssigneeIds = newList.tasks.map((task) => {
          if (!task.assignedTo.email) {
            const existingUser = users.filter(
              (user) => user._id === task.assignedTo
            );
            task.assignedTo = existingUser[0];
          }
          return task;
        });
        newList.tasks = updateTasksWithAssigneeIds; // sets the tasks array to the id changes in updateTasksWithAssigneeIds
        setLists((lists) => [...lists, { ...newList, _id }]); //adds new list data to our UI
      }
    };
    sendListData(); //sends the transaction over to Fluree DB with the list data provided
  }

  //calls the addList function on list submission
  const handleSubmit = (list) => {
    addList(list);
  };

  //tasks are deleted
  function deleteTask(chosenTask) {
    const remainingTasks = lists.map((list) => {
      //for every task loop through the task's data
      const index = list.tasks.findIndex((task) => task._id === chosenTask._id); //match on _id
      let deleteTaskFluree = async () => {
        //the transaction to delete a task in Fluree
        await axios.post(`${baseURL}transact`, [
          {
            _id: chosenTask._id, //this is the task _id to match to the task data in Fluree
            _action: 'delete', // action key required for deletions
          },
        ]);
      };
      if (index >= 0) {
        delete list.tasks[index]; //deletes the task from the UI
        deleteTaskFluree(); //issues the axios request to send the transaction to delete the task from Fluree
      }
      return list;
    });

    setLists(remainingTasks); //calls the custom hook to set the lists in the UI
  }

  //task are edited (task name or their completed status)
  async function editTask(newTask) {
    const editedTaskList = await lists.map((list) => {
      //for every task loop through the task's data
      const index = list.tasks.findIndex((task) => task._id === newTask._id); //match on _id

      let taskChangeTransact = [
        //sets the transaction to update data, this type of query can include the "_action" : "update", but if it is transact it is inferred
        {
          _id: newTask._id, //the task _id from list
          'task/name': newTask.name, //name of the task, if it is different it will change in Fluree
          'task/isCompleted': newTask.isCompleted, //completed status, if different it will change in Fluree
        },
      ];

      let editTaskProps = async () => {
        await axios.post(
          // axios request to submit an update transaction to fluree
          `${baseURL}/transact`,
          taskChangeTransact //this is the body that holds the update transaction in FlureeQL
        );
      };
      if (index >= 0) {
        list.tasks[index] = newTask; //sets the selected task to the newTask with changes
        editTaskProps();
      }
      return list;
    });
    setLists(editedTaskList); //calls the custom hook to set the lists in the UI
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
