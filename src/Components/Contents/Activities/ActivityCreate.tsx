import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

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
  fetchActivities: Function;
  toggleCreateOn: Function;
  users: User[];
  id?: string;
};

const ActivityCreate = (props: Props) => {
  const [activityNotes, setActivityNotes] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [userId, setUserId] = useState('');

  const fetchActivityData = (e: React.SyntheticEvent): void => {
    let accountId = id;
    e.preventDefault();
    fetch(`${APIURL}/activity/create`, {
      method: 'Post',
      body: JSON.stringify({
        activityNotes: activityNotes,
        dueDate: dueDate,
        accountId: accountId,
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
      <ModalClose
        onClick={() => {
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchActivityData} id='createActivity'>
        <h1>New Activity</h1>
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
        Create Activity
      </button>
    </StyledModal>
  );
};

export default ActivityCreate;
