import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import Todo from './Todo';
import UsersTab from './UsersTab';
import { ListContext } from '../ListContext';
import { Container } from '@material-ui/core';

function ListContainer() {
  const listInfo = useContext(ListContext);

  const { lists, deleteTaskFromFluree, handleUserChange, selectedUser } =
    listInfo;
  if (lists.status && lists.status === 400) {
    window.alert(
      `${lists.message} -- Have you added the ledger and updated the app code in appConfig.js with the correct ledger name?`
    );
  }

  const TaskList = (props) => {
    const listItem = (
      <Todo
        name={props.list.name}
        description={props.list.description}
        id={props.list._id}
        tasks={props.list.tasks}
        key={props.list._id}
        deleteTaskFromFluree={deleteTaskFromFluree}
      />
    );

    return <div>{listItem}</div>;
  };

  return (
    <List role='list' className='' aria-labelledby='list-heading'>
      <Container maxWidth='lg'>
        <UsersTab
          handleUserChange={handleUserChange}
          selectedUser={selectedUser}
        />
      </Container>
      {lists.map((list, i) => (
        <TaskList list={list} key={i} />
      ))}
    </List>
  );
}

export default ListContainer;
