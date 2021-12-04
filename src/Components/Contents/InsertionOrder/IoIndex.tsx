import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import IoTable from './IoTable';
import styled from 'styled-components';
import { Spinner } from '../../Styles/Spinner';
import { Io } from '../../../Types/io';

type Props = {
  token: string | null;
};

function IoIndex(props: Props) {
  const [agencies, setAgencies] = useState([]);
  const [ios, setIos] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [ioToUpdate, setIoToUpdate] = useState({
    id: '',
    agencyIO: '',
    ioBudget: 0,
    ioSpend: 0,
    agencyId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchIos = () => {
    fetch(`${APIURL}/io/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((io) => {
        setIos(io);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editIo = (io: Io) => {
    setIoToUpdate(io);
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  const toggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  const showLoading = () => {
    if (isLoading) {
      return <Spinner />;
    }
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
    fetchIos();
  }, []);

  return (
    <>
      <Container>
        {showLoading()}
        <IoTable
          token={props.token || ''}
          ios={ios}
          fetchIos={fetchIos}
          createActive={createActive}
          updateActive={updateActive}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          editIo={editIo}
          agencies={agencies}></IoTable>
      </Container>
    </>
  );
}

export default IoIndex;

export const Container = styled.div``;
