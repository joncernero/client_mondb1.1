import React, { useState } from 'react';
// import APIURL from '../../../Utilities/Environments';
import AccountEdit from './AccountEdit';
import styled from 'styled-components';
import { Agency } from '../../../Types/agency';
import { User } from '../../../Types/user';
import { Account } from '../../../Types/account';

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
          <div>
            <label>Account Name:</label>
            <p>{account.accountName}</p>
          </div>
          <div>
            <label>Account ID:</label>
            <p>{account.accountID}</p>
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
        <Title>
          <h1>Account Details</h1>
        </Title>
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

export const Title = styled.div`
  display: flex;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid #59328c;
  border-radius: 10px;
  padding: 5px 10px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* margin: 10px; */
  }

  div:nth-child(10) {
    justify-content: flex-end;
  }

  label {
    color: #59328c;
    font-weight: bold;
  }

  h1 {
    color: #59328c;
    margin: 10px 0;
    text-align: center;
  }

  p {
    color: #000000;
    margin: 0 0 0 0;
    margin-bottom: 10px;
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
