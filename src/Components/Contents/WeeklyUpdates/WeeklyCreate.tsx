import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Account } from '../../../Types/account';

type Props = {
  token: string | null;
  fetchWeeklies: Function;
  toggleCreateOn: () => void;
  accounts: Account[];
};

const WeeklyCreate = (props: Props) => {
  const [weeklyUpdate, setWeeklyUpdate] = useState('');
  const [jobCount, setJobCount] = useState(0);
  const [activeCampaigns, setActiveCampaigns] = useState(0);
  const [date, setDate] = useState('');
  const [accountId, setAccountId] = useState('');
  const { id } = useParams<{ id?: string }>();

  const fetchWeeklyData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/weeklyupdate/create`, {
      method: 'Post',
      body: JSON.stringify({
        weeklyUpdate: weeklyUpdate,
        jobCount: jobCount,
        activeCampaigns: activeCampaigns,
        date: date,
        accountId: id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setWeeklyUpdate('');
        setJobCount(0);
        setActiveCampaigns(0);
        setDate('');
        setAccountId('');
      })
      .then(() => {
        props.fetchWeeklies();
        props.toggleCreateOn();
      });
  };

  return (
    <StyledModal>
      <Title>
        <h1>New Activity</h1>
        <ModalClose
          onClick={() => {
            props.toggleCreateOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={fetchWeeklyData} id='weeklyCreate'>
        <div>
          <label htmlFor='weeklyUpdate'>Weekly Update:</label>
          <input
            name='weeklyUpdate'
            value={weeklyUpdate}
            type='text'
            onChange={(e) => setWeeklyUpdate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='jobCount'>Job Count:</label>
          <input
            name='jobCount'
            value={jobCount}
            type='number'
            onChange={(e) => setJobCount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='activeCampaigns'>Active Campaigns:</label>
          <input
            name='activeCampaigns'
            value={activeCampaigns}
            type='number'
            onChange={(e) => setActiveCampaigns(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            name='date'
            value={date}
            type='date'
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor='accountId'>Account:</label>
          <select onChange={(e) => setAccountId(e.target.value)}>
            <option value='default'></option>
            {props.accounts.map((account: Account, index) => (
              <option key={index} value={account.id}>
                {account.accountName}
              </option>
            ))}
          </select>
        </div> */}
      </form>
      <button type='submit' form='weeklyCreate'>
        Add Activity
      </button>
    </StyledModal>
  );
};

export default WeeklyCreate;
