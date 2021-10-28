import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type Props = {
  token: string | null;
  fetchAgencies: Function;
  toggleCreateOn: () => void;
};

const AgencyCreate = (props: Props) => {
  const [agencyName, setAgencyName] = useState('');

  const fetchAgencyData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(`${APIURL}/agency/create`, {
      method: 'Post',
      body: JSON.stringify({
        agencyName: agencyName,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setAgencyName('');
      })
      .then(() => {
        props.fetchAgencies();
        props.toggleCreateOn();
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
      <form onSubmit={fetchAgencyData}>
        <h1>New Agency</h1>
        <div>
          <label htmlFor='agencyName'>Agency Name:</label>
          <input
            name='agencyName'
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
          />
        </div>
        <button type='submit'>Add Agency</button>
      </form>
    </StyledModal>
  );
};

export default AgencyCreate;
