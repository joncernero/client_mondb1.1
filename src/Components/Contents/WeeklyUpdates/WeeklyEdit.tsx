import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { WeeklyUpdate } from '../../../Types/weeklyUpdate';
import { Account } from '../../../Types/account';

type Props = {
  token: string | null;
  toggleEditOn: Function;
  weeklyToUpdate: WeeklyUpdate;
  accounts: Account[];
  fetchWeeklies: Function;
};

const WeeklyEdit = (props: Props) => {
  const [editWeeklyUpdate, setEditWeeklyUpdate] = useState(
    props.weeklyToUpdate.weeklyUpdate
  );
  const [editJobCount, setEditJobCount] = useState(
    props.weeklyToUpdate.jobCount
  );
  const [editActiveCampaigns, setEditActiveCampaigns] = useState(
    props.weeklyToUpdate.activeCampaigns
  );
  const [editDate, setEditDate] = useState(props.weeklyToUpdate.date);

  const WeeklyUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/weeklyupdate/update/${props.weeklyToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        weeklyUpdate: editWeeklyUpdate,
        jobCount: editJobCount,
        activeCampaigns: editActiveCampaigns,
        date: editDate,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchWeeklies();
        props.toggleEditOn();
      });
  };

  return (
    <StyledModal>
      <Title>
        <h1>New Activity</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={WeeklyUpdate} id='weeklyCreate'>
        <div>
          <label htmlFor='editWeeklyUpdate'>Weekly Update:</label>
          <input
            name='editWeeklyUpdate'
            value={editWeeklyUpdate}
            type='text'
            onChange={(e) => setEditWeeklyUpdate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editJobCount'>Job Count:</label>
          <input
            name='editJobCount'
            value={editJobCount}
            type='number'
            onChange={(e) => setEditJobCount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editActiveCampaigns'>Active Campaigns:</label>
          <input
            name='editActiveCampaigns'
            value={editActiveCampaigns}
            type='number'
            onChange={(e) => setEditActiveCampaigns(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editDate'>Date:</label>
          <input
            name='editDate'
            value={editDate}
            type='date'
            onChange={(e) => setEditDate(e.target.value)}
          />
        </div>
      </form>
      <button type='submit' form='weeklyCreate'>
        Add Activity
      </button>
    </StyledModal>
  );
};

export default WeeklyEdit;
