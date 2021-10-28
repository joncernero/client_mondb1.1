import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import AgencyTable from './AgencyTable';
import styled from 'styled-components';
import { Spinner } from '../../Styles/Spinner';

type Agency = {
  id: string;
  agencyName: string;
};

type Props = {
  token: string | null;
};

const AgencyIndex = (props: Props) => {
  const [agencies, setAgencies] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [agencyToUpdate, setAgencyToUpdate] = useState({
    id: '',
    agencyName: '',
  });
  const [isLoading, setIsLoading] = useState(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editAgency = (agency: Agency) => {
    setAgencyToUpdate(agency);
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

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <>
      <Container>
        {showLoading()}
        <AgencyTable
          token={props.token || ''}
          agencies={agencies}
          fetchAgencies={fetchAgencies}
          createActive={createActive}
          updateActive={updateActive}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          editAgency={editAgency}
        />
      </Container>
    </>
  );
};

export default AgencyIndex;

export const Container = styled.div``;
