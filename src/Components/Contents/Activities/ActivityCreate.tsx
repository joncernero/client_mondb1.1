import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { User } from '../../../Types/user';

type Props = {
  token: string | null;
  fetchActivities: Function;
  toggleCreateOn: Function;
  users: User[];
};

const ActivityCreate = (props: Props) => {
  const [activityNotes, setActivityNotes] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [userId, setUserId] = useState('');

  const fetchActivityData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/activity/create`, {
      method: 'Post',
      body: JSON.stringify({
        activityNotes: activityNotes,
        dueDate: dueDate,
        accountId: id,
        userId: userId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setActivityNotes('');
        setDueDate('');
        setUserId('');
      })
      .then(() => {
        props.fetchActivities();
        props.toggleCreateOn(true);
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
      <form onSubmit={fetchActivityData} id='createActivity'>
        <div>
          <label htmlFor='activityNotes'>Activity:</label>
          <input
            name='activityNotes'
            value={activityNotes}
            onChange={(e) => setActivityNotes(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='dueDate'>Due Date:</label>
          <input
            name='dueDate'
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
      </form>
      <button type='submit' form='createActivity'>
        Add Activity
      </button>
    </StyledModal>
  );
};

export default ActivityCreate;
