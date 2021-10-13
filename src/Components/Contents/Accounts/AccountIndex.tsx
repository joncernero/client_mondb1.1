import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import AccountTable from './AccountTable';
import styled from 'styled-components';

type Account = {
  id: string;
  accountName: string;
  accountID: string;
  customerNumber: number;
  accountType: string;
  assignmentDate: string;
  primaryXCode: string;
  userId: string;
  agencyId: string;
};

type Props = {
  token: string | null;
};

const AccountIndex = (props: Props) => {
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
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
      return <h1>fetching</h1>;
    }
  };

  return (
    <>
      {showLoading()}
      <>
        <AccountTable
          token={props.token}
          fetchAccounts={fetchAccounts}
          createActive={createActive}
          toggleCreateOn={toggleCreateOn}
          accounts={accounts}
          users={users}
        />
      </>
    </>
  );
};

export default AccountIndex;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
