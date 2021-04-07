import React from 'react';
import ReactDOM from 'react-dom';
// the provider of the state and functionality context is imported
import { ListProvider } from './ListContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ListProvider>
    <App />
  </ListProvider>,
  document.getElementById('root')
); // the app is nested in the list provider, all its children have access to the context

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
