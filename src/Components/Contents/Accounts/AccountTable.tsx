import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';
import { User } from '../../../Types/user';
import { Account } from '../../../Types/account';

type Props = {
  token: string | null;
  accounts: Account[];
  users: User[];
  fetchAccounts: Function;
  createActive: boolean;
  toggleCreateOn: Function;
  showLoading: Function;
};

const AccountTable = (props: Props) => {
  const [query, setQuery] = useState('');
  const [filteredUser, setFilteredUser] = useState('');

  const history = useHistory();

  const AccountsMapperWithFilter = () => {
    return props.accounts
      .filter((account: Account) => {
        if (filteredUser === '') {
          return account;
        } else if (filteredUser === account.userId) {
          return account;
        }
      })
      .filter((account: Account) => {
        if (query === '') {
          return account;
        } else if (
          (
            account.accountName.toLowerCase() ||
            account.accountName.toUpperCase()
          ).includes(query.toLowerCase() || query.toUpperCase())
        ) {
          return account;
        }
      })
      .map((account: Account, index) => (
        <tr key={index}>
          <td onClick={() => history.push(`/account/${account.id}`)}>
            {account.accountName}
          </td>
          <td>{account.accountID}</td>
          <td>{account.customerNumber}</td>
          <td>{account.accountType}</td>
        </tr>
      ));
  };
  return (
    <>
      <AccountContainer>
        {props.showLoading()}
        <SearchContainer>
          <Search>
            <input
              type='search'
              width={100}
              placeholder='Search Account Name'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <i>
              <AiIcons.AiOutlineSearch />
            </i>
          </Search>
          <Filter>
            <label htmlFor='userId'>Campaign Manager:</label>
            <select onChange={(e) => setFilteredUser(e.target.value)}>
              <option value='default'></option>
              {props.users.map((user: User, index) => (
                <option key={index} value={user.id}>
                  {user.campaignManager}
                </option>
              ))}
            </select>
          </Filter>
        </SearchContainer>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th scope='col'>AccountName</th>
                <th scope='col'>AccountID</th>
                <th scope='col'>Customer #</th>
                <th scope='col'>AccountType</th>
              </tr>
            </thead>
            <tbody>{AccountsMapperWithFilter()}</tbody>
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
export const TableContainer = styled.div``;

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  height: auto;
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

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 15px 0;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #59328c;
  border-radius: 5px;
  width: 300px;
  height: 35px;
  padding: 0 5px;

  input {
    border: none;
  }
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;

  label {
    color: #59328c;
    margin-right: 10px;
    font-weight: bold;
  }
  select {
    display: flex;
    border: 2px solid #59328c;
    border-radius: 5px;
    width: 300px;
    height: 35px;
  }
`;

/*if (query === '') {
          return account;
        } else if (
          (
            account.accountName.toLowerCase() ||
            account.accountName.toUpperCase()
          ).includes(query.toLowerCase() || query.toUpperCase())
        ) {
          return account;
        }*/

/* if (filteredUser === account.userId ) { return account;} */
