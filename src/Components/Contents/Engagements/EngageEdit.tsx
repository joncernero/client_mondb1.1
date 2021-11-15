import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type Engagement = {
  id: string;
  engagementNote: string;
  date: string;
  accountId: string;
};

type Props = {
  token: string | null;
  toggleEditOn: Function;
  engagementToUpdate: Engagement;
  fetchEngagements: Function;
};

const EngagementEdit = (props: Props) => {
  const [editEngagementNote, setEditEngagementNote] = useState(
    props.engagementToUpdate.engagementNote
  );
  const [editDate, setEditDate] = useState(props.engagementToUpdate.date);

  const EngagementUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/engagement/update/${props.engagementToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        engagementNote: editEngagementNote,
        date: editDate,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchEngagements();
        props.toggleEditOn();
      });
  };

  return (
    <StyledModal>
      <Title>
        <h1>Update Engagement</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={EngagementUpdate} id='engageEdit'>
        <div>
          <label htmlFor='engagementNote'>Engagement:</label>
          <input
            name='engagementNote'
            value={editEngagementNote}
            onChange={(e) => setEditEngagementNote(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            name='date'
            type='date'
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
        </div>
      </form>
      <button type='submit' form='engageEdit'>
        Update
      </button>
    </StyledModal>
  );
};

export default EngagementEdit;
