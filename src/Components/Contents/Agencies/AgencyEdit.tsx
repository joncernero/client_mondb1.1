import React, { useState } from 'react';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import APIURL from '../../../Utilities/Environments';
import * as AiIcons from 'react-icons/ai';

type Agency = {
  id: string;
  agencyName: string;
};

type Props = {
  token: string | null;
  editAgency: Function;
  toggleEditOn: Function;
  agencyToUpdate: Agency;
  fetchAgencies: Function;
};

const AgencyEdit = (props: Props) => {
  const [editAgencyName, setEditAgencyName] = useState(
    props.agencyToUpdate.agencyName
  );

  const AgencyUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/agency/update/${props.agencyToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        agencyName: editAgencyName,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchAgencies();
        props.editAgency();
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
      <form onSubmit={AgencyUpdate}>
        <h1>Update Agency</h1>
        <div>
          <label htmlFor='agencyName'>Agency Name:</label>
          <input
            name='agencyName'
            value={editAgencyName}
            onChange={(e) => setEditAgencyName(e.target.value)}
          />
        </div>
        <button type='submit'>Edit Agency</button>
      </form>
    </StyledModal>
  );
};

export default AgencyEdit;
