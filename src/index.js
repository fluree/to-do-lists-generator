import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const DATA = [
  {
    name: 'My first List',
    description: 'My first example list',
    id: 'todo-0',
    tasks: [
      {
        id: 'task-0',
        task: 'exercise',
        completed: true,
        assignee: 'Flor',
        email: 'flor@flor.com',
      },
      {
        id: 'task-1',
        task: 'Eat Lunch',
        completed: true,
        assignee: 'Flor',
        email: 'flor@flor.com',
      },
      {
        id: 'task-2',
        task: 'go for a run',
        completed: false,
        assignee: 'Flor',
        email: 'flor@flor.com',
      },
      {
        id: 'task-3',
        task: 'feed Nemo',
        completed: false,
        assignee: 'Flor',
        email: 'flor@flor.com',
      },
      {
        id: 'task-4',
        task: 'nap time',
        completed: false,
        assignee: 'Flor',
        email: 'flor@flor.com',
      },
    ],
  },
];

ReactDOM.render(<App data={DATA} />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
