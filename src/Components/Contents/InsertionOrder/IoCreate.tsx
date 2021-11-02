import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';

type Agency = {
  id: string;
  agencyName: string;
};

type Props = {
  token: string | null;
  fetchIos: Function;
  toggleCreateOn: () => void;
};

const IoCreate = (props: Props) => {
  const [agencies, setAgencies] = useState([]);
  const [agencyIO, setAgencyIO] = useState('');
  const [ioSpend, setIoSpend] = useState(0);
  const [agencyId, setAgencyId] = useState('');

  const fetchIoData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(`${APIURL}/io/create`, {
      method: 'Post',
      body: JSON.stringify({
        agencyIO: agencyIO,
        ioSpend: ioSpend,
        agencyId: agencyId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setAgencyIO('');
        setIoSpend(0);
      })
      .then(() => {
        props.fetchIos();
        props.toggleCreateOn();
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
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchIoData} id='ioCreate'>
        <h1>Agency Insertion Order</h1>
        <div>
          <label htmlFor='agencyIO'>IO #:</label>
          <input
            name='agencyIo'
            value={agencyIO}
            onChange={(e) => setAgencyIO(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='ioSpend'>Io Spend:</label>
          <input
            name='ioSpend'
            value={ioSpend}
            onChange={(e) => setIoSpend(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='agencyId'>Agency Name:</label>
          <select onChange={(e) => setAgencyId(e.target.value)}>
            <option value='default'></option>
            {agencies.map((agency: Agency, index) => (
              <option key={index} value={agency.id}>
                {agency.agencyName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button type='submit' form='ioCreate'>
        Add Agency
      </button>
    </StyledModal>
  );
};

export default IoCreate;