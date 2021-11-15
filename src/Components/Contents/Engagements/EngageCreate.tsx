import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchEngagements: Function;
  toggleCreateOn: Function;
};

const EngagementCreate = (props: Props) => {
  const [engagementNote, setEngagementNote] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [accountId, setAccountId] = useState('');

  const fetchEngagementData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/engagement/create`, {
      method: 'Post',
      body: JSON.stringify({
        engagementNote: engagementNote,
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
      <Title>
        <h1>New Engagement</h1>
        <ModalClose
          onClick={() => {
            props.toggleCreateOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={fetchEngagementData} id='engageCreate'>
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
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </form>
      <button type='submit' form='engageCreate'>
        Add Engagement
      </button>
    </StyledModal>
  );
};

export default EngagementCreate;
