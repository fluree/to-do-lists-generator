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
    task: [
      'Exercise',
      'Nap',
      'Eat protein for lunch',
      'Go for a run after work',
      'feed Nemo',
    ],
    completed: [true, true, false, false, false],
    assignee: ['Flor', 'Felix', 'Flor', 'Flor', 'Felix'],
    email: [
      'flor@flor.com',
      'felix@felix.com',
      'flor@flor.com',
      'flor@flor.com',
      'felix@felix.com',
    ],
  },
];

ReactDOM.render(<App tasks={DATA} />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
