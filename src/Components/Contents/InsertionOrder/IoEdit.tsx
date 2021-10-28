import React, { useState, useEffect } from 'react';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import APIURL from '../../../Utilities/Environments';
import * as AiIcons from 'react-icons/ai';

type Agency = {
  id: string;
  agencyName: string;
};

type Io = {
  id: string;
  agencyIO: string;
  ioSpend: number;
  agencyId: string;
};

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
  const [editIoSpend, setEditIoSpend] = useState(props.ioToUpdate.ioSpend);
  const [editAgencyId, setEditAgencyId] = useState(props.ioToUpdate.agencyId);

  const IoUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/io/update/${props.ioToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        agencyIO: editAgencyIO,
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
      <ModalClose
        onClick={() => {
          props.toggleEditOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={IoUpdate} id='ioUpdate'>
        <h1>Update IO</h1>
        <div>
          <label htmlFor='agencyIO'>IO #:</label>
          <input
            name='agencyIO'
            value={editAgencyIO}
            onChange={(e) => setEditAgencyIO(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='ioSpend'>IO Spend:</label>
          <input
            name='ioSpend'
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
