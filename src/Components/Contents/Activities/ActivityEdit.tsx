import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { User } from '../../../Types/user';
import { Activity } from '../../../Types/activity';

type Props = {
  token: string | null;
  toggleEditOn: Function;
  activityToUpdate: Activity;
  users: User[];
  fetchActivities: Function;
};

const ActivityEdit = (props: Props) => {
  const [editActivityNotes, setEditActivityNotes] = useState(
    props.activityToUpdate.activityNotes
  );
  const [editDueDate, setEditDueDate] = useState(
    props.activityToUpdate.dueDate
  );

  const [editUserId, setEditUserId] = useState(props.activityToUpdate.userId);

  const ActivityUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/activity/update/${props.activityToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        activityNotes: editActivityNotes,
        dueDate: editDueDate,
        userId: editUserId,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchActivities();
        props.toggleEditOn();
      });
  };

  return (
    <StyledModal>
      <Title>
        <h1>Update Activity</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={ActivityUpdate} id='ActivityUpdate'>
        <div>
          <label htmlFor='activityNotes'>Activity:</label>
          <input
            name='activityNotes'
            value={editActivityNotes}
            onChange={(e) => setEditActivityNotes(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='dueDate'>Due Date:</label>
          <input
            name='dueDate'
            type='date'
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
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
      </form>
      <button type='submit' form='ActivityUpdate'>
        Update
      </button>
    </StyledModal>
  );
};

export default ActivityEdit;
