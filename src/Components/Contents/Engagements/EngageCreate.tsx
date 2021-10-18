import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchEngagements: Function;
  toggleCreateOn: Function;
  id?: string;
};

const EngagementCreate = (props: Props) => {
  const [engagementNote, setEngagementNote] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [accountId, setAccountId] = useState('');

  const fetchEngagementData = (e: React.SyntheticEvent): void => {
    let accountId = id;
    e.preventDefault();
    fetch(`${APIURL}/engagement/create`, {
      method: 'Post',
      body: JSON.stringify({
        engagementNote: engagementNote,
        date: date,
        accountId: accountId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setEngagementNote('');
        setDate('');
        setAccountId('');
      })
      .then(() => {
        props.fetchEngagements();
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
      <form onSubmit={fetchEngagementData}>
        <h1>New Engagement</h1>
        <div>
          <label htmlFor='engagementNote'>Engagement:</label>
          <input
            name='engagementNote'
            value={engagementNote}
            onChange={(e) => setEngagementNote(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type='submit'>Add Engagement</button>
      </form>
    </StyledModal>
  );
};

export default EngagementCreate;
