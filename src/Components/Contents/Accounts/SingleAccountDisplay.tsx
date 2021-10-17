import React, { useState } from 'react';
// import APIURL from '../../../Utilities/Environments';
import AccountEdit from './AccountEdit';
import styled from 'styled-components';

type Agency = {
  id: string;
  agencyName: string;
};

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
  account: Account[];
  users: User[];
  agencies: Agency[];
  fetchSingleAccount: Function;
  editAccount: Function;
  toggleEditOn: Function;
  updateActive: boolean;
  accountToUpdate: Account;
};

const SingleAccountDisplay = (props: Props) => {
  const [editingAccount, setEditingAccount] = useState<Account | undefined>();

  const AccountMapper = () => {
    return props.account.map((account: Account, index) => {
      return (
        <div key={index}>
          <h1>Account Details</h1>
          <div>
            <label>Account Name:</label>
            <p>{account.accountName}</p>
          </div>
          <div>
            <label>Account ID:</label>
            <p>{account.accountName}</p>
          </div>
          <div>
            <label>Customer Number:</label>
            <p>{account.customerNumber}</p>
          </div>
          <div>
            <label>Account Type:</label>
            <p>{account.accountType}</p>
          </div>
          <div>
            <label>Assignment Date:</label>
            <p>{account.assignmentDate}</p>
          </div>
          <div>
            <label>Primary XCode:</label>
            <p>{account.primaryXCode}</p>
          </div>
          <div>
            <label>Campaign Manager:</label>
            <p>
              {props.users.map((user: User) => {
                return user.id === account.userId ? user.campaignManager : null;
              })}
            </p>
          </div>
          <div>
            <label>Agency Name:</label>
            <p>
              {props.agencies.map((agency: Agency) => {
                return agency.id === account.agencyId
                  ? agency.agencyName
                  : null;
              })}
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setEditingAccount(account);
                props.editAccount();
                props.toggleEditOn();
              }}>
              Edit Account
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Container>
        <div>{AccountMapper()}</div>
      </Container>
      {props.updateActive && editingAccount ? (
        <AccountEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchSingleAccount={props.fetchSingleAccount}
          accountToUpdate={editingAccount}
          editAccount={props.editAccount}
          users={props.users}
          agencies={props.agencies}
        />
      ) : null}
    </>
  );
};

export default SingleAccountDisplay;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid #59328c;
  border-radius: 10px;
  padding: 10px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 5px;
  }

  div:not(:first-child) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 5px;
  }

  div:nth-child(10) {
    justify-content: flex-end;
  }

  label {
    align-self: flex-start;
    margin-bottom: 0.5em;
    color: #59328c;
    text-align: left;
    font-weight: bold;
  }

  h1 {
    color: #59328c;
    align-self: flex-start;
    margin: 10px 0;
  }

  p {
    color: #000000;
    margin: 0 0 0 5px;
  }

  button {
    height: 35px;
    width: auto;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    background: #59328c;
    border-radius: 5px;
    text-align: center;
    margin: 10px 0;
    padding: 5px;

    &:hover {
      background: transparent;
      color: #59328c;
      border: 2px solid #59328c;
    }
  }
`;
