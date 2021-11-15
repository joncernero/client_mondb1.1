import React from 'react';
import { useHistory } from 'react-router-dom';
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
    <>
      <AccountContainer>
        <TableContainer>
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
        </TableContainer>
      </AccountContainer>
    </>
  );
};

export default AccountTable;

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  color: #59328c;
  justify-content: space-between;
  margin: 0 15px 15px 15px;
`;

export const TableContainer = styled.div``;

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 500px;
  padding: 5px 5px 10px 5px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background: #59328c;
    width: 100%;
    height: 15px;
  }

  thead th:nth-child(1) {
    text-align: left;
    width: 10%;
    overflow: wrap;
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
