import React, { useContext, useState } from 'react';
import List from '@material-ui/core/List';
import Todo from './Todo';
import UsersTab from './UsersTab';
import { ListContext } from '../ListContext';
import { Container } from '@material-ui/core';
import usersAuth from '../data/usersAuth';
// import { signQuery, signTransaction } from '@fluree/crypto-utils';

function ListContainer() {
  const listInfo = useContext(ListContext);
  const [selectedUser, setSelectedUser] = useState(usersAuth['rootUser']);

  const { lists, deleteTask } = listInfo;

  const handleUserChange = (event, name) => {
    event.preventDefault();
    setSelectedUser(usersAuth[name]);
  };

  // const changeListDisplay = () => {};

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
