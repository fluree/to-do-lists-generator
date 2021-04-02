import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import Todo from './Todo';
import { ListContext } from '../ListContext';

function ListContainer() {
  const listInfo = useContext(ListContext);

  const { lists, deleteTask } = listInfo;

  const TaskList = (props) => {
    const listItem = (
      <Todo
        name={props.list.name}
        description={props.list.description}
        id={props.list._id}
        tasks={props.list.tasks}
        key={props.list._id}
        deleteTask={deleteTask}
      />
    );

    return <div>{listItem}</div>;
  };

  return (
    <List role='list' className='' aria-labelledby='list-heading'>
      {lists.map((list, i) => (
        <TaskList list={list} key={i} />
      ))}
    </List>
  );
}

export default ListContainer;
