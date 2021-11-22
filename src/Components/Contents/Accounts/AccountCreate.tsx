import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

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

type Props = {
  token: string | null;
  fetchAccounts: Function;
  toggleCreateOn: Function;
  users: User[];
};

const AccountCreate = (props: Props) => {
  const [agencies, setAgencies] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [accountID, setAccountID] = useState('');
  const [customerNumber, setCustomerNumber] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [primaryXCode, setPrimaryXCode] = useState('');
  const [userId, setUserId] = useState('');
  const [agencyId, setAgencyId] = useState('');
  // const [users, setUsers] = useState([]);

  const fetchAccountData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/account/create`, {
      method: 'Post',
      body: JSON.stringify({
        accountName: accountName,
        accountID: accountID,
        customerNumber: customerNumber,
        accountType: accountType,
        assignmentDate: assignmentDate,
        primaryXCode: primaryXCode,
        userId: userId,
        agencyId: agencyId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setAccountName('');
        setAccountID('');
        setCustomerNumber(0);
        setAccountType('');
        setAssignmentDate('');
        setPrimaryXCode('');
        setUserId('');
        setAgencyId('');
      })
      .then(() => {
        props.fetchAccounts();
        props.toggleCreateOn(true);
      });
  };

  useEffect(() => {
    const fetchAgencies = () => {
      fetch(`${APIURL}/agency/`, {
        method: 'Get',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        }),
      })
        .then((res) => res.json())
        .then((agency) => {
          setAgencies(agency);
        });
    };
    fetchAgencies();
  }, []);

  return (
    //unfixed
    <StyledModal>
      <Title>
        <h1>Create New Property</h1>
        <ModalClose
          onClick={() => {
            props.toggleCreateOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={fetchAccountData} id='createAccount'>
        <div>
          <label htmlFor='accountName'>AccountName:</label>
          <input
            name='accountName'
            type='text'
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='accountId'>Account ID:</label>
          <input
            name='accountId'
            type='text'
            value={accountID}
            onChange={(e) => setAccountID(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='customerNumber'>Customer #:</label>
          <input
            name='customerNumber'
            type='text'
            value={customerNumber}
            onChange={(e) => setCustomerNumber(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='accountType'>AccountType:</label>
          <input
            name='accountType'
            type='text'
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='assignmentDate'>AssignmentDate:</label>
          <input
            name='assignmentDate'
            type='date'
            value={assignmentDate}
            onChange={(e) => setAssignmentDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='primaryXCode'>Primary XCode:</label>
          <input
            name='primaryXCode'
            type='text'
            value={primaryXCode}
            onChange={(e) => setPrimaryXCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='userId'>Campaign Manager:</label>
          <select onChange={(e) => setUserId(e.target.value)}>
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
          <select onChange={(e) => setAgencyId(e.target.value)}>
            <option value='default'></option>
            {agencies.map((agency: Agency, index) => (
              <option key={index} value={agency.id}>
                {agency.agencyName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button type='submit' form='createAccount'>
        Add Account
      </button>
    </StyledModal>
  );
};

export default AccountCreate;
