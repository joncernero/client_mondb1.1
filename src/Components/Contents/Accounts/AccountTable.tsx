import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AccountCreate from './AccountCreate';

type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  campaignManager: string;
  role: string;
};

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
  accounts: Account[];
  users: User[];
  fetchAccounts: Function;
  createActive: boolean;
  toggleCreateOn: Function;
};

const AccountTable = (props: Props) => {
  const history = useHistory();

  const AccountsMapper = () => {
    return props.accounts.map((account: Account, index) => {
      return (
        <tr key={index}>
          <td onClick={() => history.push(`/account/${account.id}`)}>
            {account.accountName}
          </td>
          <td>{account.accountID}</td>
          <td>{account.customerNumber}</td>
          <td>{account.accountType}</td>
          <td>{account.assignmentDate}</td>
          <td>{account.primaryXCode}</td>
        </tr>
      );
    });
  };

  return (
    <Container>
      <ChildOne>
        {props.createActive ? (
          <AccountCreate
            token={props.token}
            users={props.users}
            fetchAccounts={props.fetchAccounts}
            toggleCreateOn={props.toggleCreateOn}
          />
        ) : null}
        <div>
          {/* <h1>{`Welcome`}</h1> */}
          <button
            onClick={() => {
              props.toggleCreateOn();
            }}>
            Create Account
          </button>
        </div>
        <Table>
          <thead>
            <tr>
              <th scope='col'>AccountName</th>
              <th scope='col'>AccountID</th>
              <th scope='col'>Customer #</th>
              <th scope='col'>AccountType</th>
              <th scope='col'>Assignment Date</th>
              <th scope='col'>primary XCode</th>
            </tr>
          </thead>
          <tbody>{AccountsMapper()}</tbody>
        </Table>
      </ChildOne>
    </Container>
  );
};

export default AccountTable;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  row-gap: 50px;
  grid-template-areas:
    'one one'
    'one one'
    'one one'
    'two two';
  height: 90vh;
  width: auto;
`;

export const ChildOne = styled.div`
  grid-area: one;
  height: auto;
  width: 70vw;
  padding: 25px;

  div {
    display: flex;
    justify-content: flex-end;
  }

  button {
    height: 40px;
    width: 150px;
    color: #59328c;
    font-size: 15px;
    font-weight: bold;
    background: transparent;
    border-radius: 5px;
    margin: 25px;
    padding: 10px;

    &:hover {
      background: #c2abe1;
      color: #ffffff;
      border: 2px solid #c2abe1;
    }
  }
`;

export const ChildTwo = styled.div`
  grid-area: two;
  width: 60vw;
  align-self: center;
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  padding: 25px 25px;
  border: 2px solid #59328c;
  border-radius: 10px;
  margin-bottom: 10px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background: #59328c;
    width: 100%;
  }

  thead th:nth-child(1) {
    text-align: left;
    width: 10%;
  }

  thead th:nth-child(2) {
    width: 10%;
  }

  thead th:nth-child(3) {
    width: 15%;
  }

  thead th:nth-child(4) {
    width: 10%;
  }

  thead th:nth-child(5) {
    width: 10%;
  }

  thead th:nth-child(6) {
    width: 10%;
  }

  tbody tr {
    &:hover {
      background: #c2abe1;
      color: #ffffff;
      font-weight: bold;
    }
  }

  tbody tr:nth-child(even) {
    background: #f3f3f3;

    &:hover {
      background: #c2abe1;
    }
  }

  th {
    color: #ffffff;
    padding: 15px;
  }

  tbody td {
  }

  td {
    padding: 15px;
    width: auto;
  }

  td:not(:first-child) {
    text-align: center;
  }

  button {
    padding: 5px 15px;
    border-radius: 5px;

    &:hover {
      background: #59328c;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;
