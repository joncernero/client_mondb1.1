import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { Agency } from '../../../Types/agency';
import { User } from '../../../Types/user';
import { Account } from '../../../Types/account';

type Props = {
  token: string | null;
  toggleEditOn: Function;
  editAccount: Function;
  accountToUpdate: Account;
  users: User[];
  agencies: Agency[];
  fetchSingleAccount: Function;
};

const AccountUpdate = (props: Props) => {
  const [editAccountName, setEditAccountName] = useState(
    props.accountToUpdate.accountName
  );
  const [editAccountID, setEditAccountID] = useState(
    props.accountToUpdate.accountID
  );
  const [editCustomerNumber, setEditCustomerNumber] = useState(
    props.accountToUpdate.customerNumber
  );
  const [editAccountType, setEditAccountType] = useState(
    props.accountToUpdate.accountType
  );
  const [editAssignmentDate, setEditAssignmentDate] = useState(
    props.accountToUpdate.assignmentDate
  );
  const [editPrimaryXCode, setEditPrimaryXCode] = useState(
    props.accountToUpdate.primaryXCode
  );
  const [editUserId, setEditUserId] = useState<String | undefined>(
    props.accountToUpdate.userId
  );
  const [editAgencyId, setEditAgencyId] = useState<String | undefined>(
    props.accountToUpdate.agencyId
  );

  const accountUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/account/update/${props.accountToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        accountName: editAccountName,
        accountID: editAccountID,
        customerNumber: editCustomerNumber,
        accountType: editAccountType,
        assignmentDate: editAssignmentDate,
        primaryXCode: editPrimaryXCode,
        userId: editUserId,
        agencyId: editAgencyId,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchSingleAccount();
        props.toggleEditOn();
        props.editAccount();
      });
  };

  return (
    //fixed
    <StyledModal>
      <Title>
        <h1>{`Update ${props.accountToUpdate.accountName}`}</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={accountUpdate} id='updateAccount'>
        <div>
          <label htmlFor='accountName'>AccountName:</label>
          <input
            name='accountName'
            value={editAccountName}
            onChange={(e) => setEditAccountName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='accountID'>Account ID:</label>
          <input
            name='accountID'
            value={editAccountID}
            onChange={(e) => setEditAccountID(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='customerNumber'>Customer #:</label>
          <input
            name='customerNumber'
            value={editCustomerNumber}
            onChange={(e) => setEditCustomerNumber(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='accountType'>Account Type:</label>
          <input
            name='accountType'
            value={editAccountType}
            onChange={(e) => setEditAccountType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='assignmentDate'>Assignment Date:</label>
          <input
            name='assignmentDate'
            type='date'
            value={editAssignmentDate}
            onChange={(e) => setEditAssignmentDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='primaryXCode'>Primary XCode:</label>
          <input
            name='primaryXCode'
            value={editPrimaryXCode}
            onChange={(e) => setEditPrimaryXCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='userId'>CampaignManager:</label>
          <select onChange={(e) => setEditUserId(e.target.value)}>
            <option value='default'></option>
            {props.users.map((user: User, index) => (
              <option key={index} value={user.id}>
                {user.campaignManager}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='agencyId'>Agency Name:</label>
          <select onChange={(e) => setEditAgencyId(e.target.value)}>
            <option value='default'></option>
            {props.agencies.map((agency: Agency, index) => (
              <option key={index} value={agency.id}>
                {agency.agencyName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button type='submit' form='updateAccount'>
        Update Account
      </button>
    </StyledModal>
  );
};

export default AccountUpdate;
