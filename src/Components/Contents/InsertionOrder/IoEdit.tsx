import React, { useState, useEffect } from 'react';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import APIURL from '../../../Utilities/Environments';
import * as AiIcons from 'react-icons/ai';
import { Agency } from '../../../Types/agency';
import { Io } from '../../../Types/io';

type Props = {
  token: string | null;
  editIo: Function;
  toggleEditOn: () => void;
  ioToUpdate: Io;
  fetchIos: Function;
  agencies: Agency[];
};

const IoEdit = (props: Props) => {
  const [agencies, setAgencies] = useState([]);
  const [editAgencyIO, setEditAgencyIO] = useState(props.ioToUpdate.agencyIO);
  const [editIoBudget, setEditIoBudget] = useState(props.ioToUpdate.ioBudget);
  const [editIoSpend, setEditIoSpend] = useState(props.ioToUpdate.ioSpend);
  const [editAgencyId, setEditAgencyId] = useState(props.ioToUpdate.agencyId);

  const IoUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/io/update/${props.ioToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        agencyIO: editAgencyIO,
        ioBudget: editIoBudget,
        ioSpend: editIoSpend,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchIos();
        props.editIo();
        props.toggleEditOn();
      });
  };

  const fetchAgencies = () => {
    fetch(`${APIURL}/agency/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((agency) => {
        setAgencies(agency);
      });
  };
  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <StyledModal>
      <Title>
        <h1>Update IO</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={IoUpdate} id='ioUpdate'>
        <div>
          <label htmlFor='agencyIO'>IO #:</label>
          <input
            name='agencyIO'
            value={editAgencyIO}
            onChange={(e) => setEditAgencyIO(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='ioBudget'>IO Budget:</label>
          <input
            name='ioBudget'
            type='number'
            value={editIoBudget}
            onChange={(e) => setEditIoBudget(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='ioSpend'>IO Spend:</label>
          <input
            name='ioSpend'
            type='number'
            value={editIoSpend}
            onChange={(e) => setEditIoSpend(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='agencyId'>Agency Name:</label>
          <select onChange={(e) => setEditAgencyId(e.target.value)}>
            <option value='default'></option>
            {agencies.map((agency: Agency, index) => (
              <option key={index} value={agency.id}>
                {agency.agencyName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button type='submit' form='ioUpdate'>
        Edit Agency
      </button>
    </StyledModal>
  );
};

export default IoEdit;
