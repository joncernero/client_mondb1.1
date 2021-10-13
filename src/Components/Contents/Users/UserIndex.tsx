import React, { useState, useEffect } from 'react';
import Register from '../../Authorization/Register';
import UserTable from './UserTable';
import APIURL from '../../../Utilities/Environments';
import styled from 'styled-components';

type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  campaignManager: string;
  role: string;
};

type Props = {
  token: string | null;
};

const UserIndex = (props: Props) => {
  const [users, setUsers] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState({
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    campaignManager: '',
    role: '',
  });

  const fetchUsers = () => {
    fetch(`${APIURL}/user/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        setUsers(user);
      });
  };

  const editUser = (user: User) => {
    setUserToUpdate(user);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        <ChildOne>
          <Register token={props.token} fetchUsers={fetchUsers} />
        </ChildOne>
        <ChildTwo>
          <UserTable
            users={users}
            token={props.token}
            fetchUsers={fetchUsers}
            updateActive={updateActive}
            editUser={editUser}
          />
        </ChildTwo>
      </Container>
    </>
  );
};

export default UserIndex;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  row-gap: 175px;
  grid-template-areas:
    'one one'
    'two two';
  height: 90vh;
  width: auto;
  padding: 10px;
`;

export const ChildOne = styled.div`
  grid-area: one;
  height: 10vh;
  width: 60vw;
  /* margin: 10px 25px; */
`;
export const ChildTwo = styled.div`
  grid-area: two;
  width: 60vw;
  align-self: center;
`;
