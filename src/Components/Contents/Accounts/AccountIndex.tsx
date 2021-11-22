import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import AccountTable from './AccountTable';
import AccountCreate from './AccountCreate';
import { Spinner } from '../../Styles/Spinner';
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
  user: User;
};

const AccountIndex = (props: Props) => {
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const [createActive, setCreateActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccounts = () => {
    fetch(`${APIURL}/account/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((account) => {
        setAccounts(account);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  useEffect(() => {
    fetchAccounts();
    const fetchUsers = () => {
      fetch(`${APIURL}/user`, {
        method: 'Get',
        headers: new Headers({
          'Content-Type': 'application/Json',
          Authorization: `${localStorage.getItem('token')}`,
        }),
      })
        .then((res) => res.json())
        .then((user) => {
          setUsers(user);
        });
    };
    fetchUsers();
  }, []);

  const showLoading = () => {
    if (isLoading) {
      return <Spinner />;
    }
  };

  return (
    <>
      {createActive ? (
        <AccountCreate
          token={props.token}
          users={users}
          fetchAccounts={fetchAccounts}
          toggleCreateOn={toggleCreateOn}
        />
      ) : null}
      <Title>
        <h2>{`Welcome ${props.user.firstName},`}</h2>
        <button
          onClick={() => {
            toggleCreateOn();
          }}>
          Create Account
        </button>
      </Title>
      {showLoading()}
      <Container>
        <AccountTable
          token={props.token}
          fetchAccounts={fetchAccounts}
          createActive={createActive}
          toggleCreateOn={toggleCreateOn}
          accounts={accounts}
          users={users}
        />
      </Container>
    </>
  );
};

export default AccountIndex;

export const Container = styled.div`
  height: 80vh;
  padding: 10px;
  overflow: scroll;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #59328c;
  margin: 0 15px 0 15px;

  button {
    align-self: flex-end;
    background: #ffffff;
    color: #59328c;
    padding: 5px 15px;
    font-weight: bold;
    border: 2px solid #59328c;
    border-radius: 5px;
    height: 35px;

    &:hover {
      background: #59328c;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;
