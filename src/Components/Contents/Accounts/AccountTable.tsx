import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from '../../Styles/AccountTableStyles';
import { Container, ChildOne } from '../../Styles/DashBoardContainer';
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
