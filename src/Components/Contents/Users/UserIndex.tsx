import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import AgencyIndex from '../Agencies/AgencyIndex';
import IoIndex from '../InsertionOrder/IoIndex';
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
  const [createActive, setCreateActive] = useState(false);
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

  const toggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        <ChildOne>
          <UserTable
            users={users}
            token={props.token}
            fetchUsers={fetchUsers}
            updateActive={updateActive}
            createActive={createActive}
            toggleCreateOn={toggleCreateOn}
            editUser={editUser}
          />
        </ChildOne>
        <ChildTwo>
          <AgencyIndex token={props.token} />
        </ChildTwo>
        <ChildThree>
          <IoIndex token={props.token} />
        </ChildThree>
      </Container>
    </>
  );
};

export default UserIndex;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  row-gap: 10px;
  column-gap: 20px;
  grid-template-areas:
    'one two'
    'three two';
  height: 90vh;
  width: auto;
  padding: 0 100px 0 100px;
`;

export const ChildOne = styled.div`
  grid-area: one;
  width: 100%;
  height: 300px;
  overflow: scroll;
  border: 2px solid #59328c;
  border-radius: 10px;
`;

export const ChildTwo = styled.div`
  grid-area: two;
  width: 100%;
  height: 300px;
  overflow: scroll;
  border: 2px solid #59328c;
  border-radius: 10px;
`;

export const ChildThree = styled.div`
  grid-area: three;
  width: 100%;
  height: 300px;
  overflow: scroll;
  border: 2px solid #59328c;
  border-radius: 10px;
`;
