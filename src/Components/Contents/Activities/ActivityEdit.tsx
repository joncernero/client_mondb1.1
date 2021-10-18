import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  campaignManager: string;
  role: string;
};

type Activity = {
  id: string;
  activityNotes: string;
  dueDate: string;
  accountId: string;
  userId: string;
};

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
      <ModalClose
        onClick={() => {
          props.toggleEditOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={ActivityUpdate} id='ActivityUpdate'>
        <h1>Update Activity</h1>
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
        <button type='submit' form='ActivityUpdate'>
          Update
        </button>
      </form>
    </StyledModal>
  );
};

export default ActivityEdit;
