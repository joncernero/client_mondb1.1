import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchStatus: Function;
  toggleCreateOn: Function;
  id?: string;
};

const StatusCreate = (props: Props) => {
  const [atRiskAtOnset, setAtRiskAtOnset] = useState('');
  const [accountState, setAccountState] = useState('');
  const [introStatus, setIntroStatus] = useState('');
  const [health, setHealth] = useState('');
  const [churnDate, setChurnDate] = useState('');
  const [closeNotes, setCloseNotes] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [accountId, setAccountId] = useState('');

  const fetchStatusData = (e: React.SyntheticEvent): void => {
    let accountId = id;
    e.preventDefault();
    fetch(`${APIURL}/status/create`, {
      method: 'Post',
      body: JSON.stringify({
        atRiskAtOnset: atRiskAtOnset,
        accountState: accountState,
        introStatus: introStatus,
        health: health,
        churnDate: churnDate,
        closeNotes: closeNotes,
        accountId: accountId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setAtRiskAtOnset('');
        setAccountState('');
        setIntroStatus('');
        setHealth('');
        setChurnDate('');
        setCloseNotes('');
        setAccountId('');
      })
      .then(() => {
        props.fetchStatus();
        props.toggleCreateOn(true);
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
      <ModalClose
        onClick={() => {
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchStatusData}>
        <h1>Add Account Status</h1>
        <div>
          <label htmlFor='atRiskAtOnset'>At-Risk-At-Onset:</label>
          <select onChange={(e) => setAtRiskAtOnset(e.target.value)}>
            <option value='default'></option>
            {AtRiskArray.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='accountState'>Account State:</label>
          <select onChange={(e) => setAccountState(e.target.value)}>
            <option value='default'></option>
            {AccountStateArray.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='introStatus'>Intro Status:</label>
          <select onChange={(e) => setIntroStatus(e.target.value)}>
            <option value='default'></option>
            {IntroStatusArray.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='health'>Health:</label>
          <select onChange={(e) => setHealth(e.target.value)}>
            <option value='default'></option>
            {HealthArray.map((health, index) => (
              <option key={index} value={health}>
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
              value={churnDate}
              onChange={(e) => setChurnDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor='closeNotes'>Close Notes:</label>
          <input
            name='churnNotes'
            value={closeNotes}
            onChange={(e) => setCloseNotes(e.target.value)}
          />
        </div>
        <button type='submit'>Add Status</button>
      </form>
    </StyledModal>
  );
};

export default StatusCreate;
