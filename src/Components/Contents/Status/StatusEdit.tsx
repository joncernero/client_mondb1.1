import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type Status = {
  id: string;
  atRiskAtOnset: string;
  accountState: string;
  introStatus: string;
  health: string;
  churnDate: string;
  closeNotes: string;
  accountId: string;
};

type Props = {
  token: string | null;
  toggleEditOn: Function;
  statusToUpdate: Status;
  fetchStatus: Function;
};

const StatusEdit = (props: Props) => {
  const [editAtRiskAtOnset, setEditAtRiskAtOnset] = useState('');
  const [editAccountState, setEditAccountState] = useState('');
  const [editIntroStatus, setEditIntroStatus] = useState('');
  const [editHealth, setEditHealth] = useState('');
  const [editChurnDate, setEditChurnDate] = useState('');
  const [editCloseNotes, setEditCloseNotes] = useState('');

  const StatusUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/status/update/${props.statusToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        atRiskAtOnset: editAtRiskAtOnset,
        accountState: editAccountState,
        introStatus: editIntroStatus,
        health: editHealth,
        churnDate: editChurnDate,
        closeNotes: editCloseNotes,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchStatus();
        props.toggleEditOn();
      });
  };

  const AccountStateArray = [
    'Presale',
    'Pending',
    'Active',
    'Paused',
    'Closed',
    'Organic',
    'Presale Closed',
    'Transitioned - Agency',
    'Transitioned - Direct',
    'Transitioned - PX',
  ];

  const AtRiskArray = ['Yes', 'No'];

  const IntroStatusArray = [
    'New to Monster',
    'Conversion from Duration',
    'Renewed from Duration',
    'Returning PPC',
  ];

  const HealthArray = ['Green', 'Yellow', 'Red'];

  return (
    <StyledModal>
      <Title>
        <h1>Update Account Status</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={StatusUpdate} id='statusUpdate'>
        <div>
          <label htmlFor='atRiskAtOnset'>At-Risk-At-Onset:</label>
          <select onChange={(e) => setEditAtRiskAtOnset(e.target.value)}>
            <option value='default'></option>
            {AtRiskArray.map((option, index) => (
              <option key={index} value={editAtRiskAtOnset}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='accountState'>Account State:</label>
          <select onChange={(e) => setEditAccountState(e.target.value)}>
            <option value='default'></option>
            {AccountStateArray.map((state, index) => (
              <option key={index} value={editAccountState}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='introStatus'>Intro Status:</label>
          <select onChange={(e) => setEditIntroStatus(e.target.value)}>
            <option value='default'></option>
            {IntroStatusArray.map((status, index) => (
              <option key={index} value={editIntroStatus}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='health'>Health:</label>
          <select onChange={(e) => setEditHealth(e.target.value)}>
            <option value='default'></option>
            {HealthArray.map((health, index) => (
              <option key={index} value={editHealth}>
                {health}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <label htmlFor='churnDate'>Churn Date:</label>
            <input
              name='churnDate'
              type='date'
              value={editChurnDate}
              onChange={(e) => setEditChurnDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor='closeNotes'>Close Notes:</label>
          <input
            name='churnNotes'
            value={editCloseNotes}
            onChange={(e) => setEditCloseNotes(e.target.value)}
          />
        </div>
      </form>
      <button type='submit' form='statusUpdate'>
        Add Status
      </button>
    </StyledModal>
  );
};

export default StatusEdit;
