import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import EngagementTable from './EngageTable';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';

type Engagement = {
  id: string;
  engagementNote: string;
  date: string;
  accountId: string;
};

type Props = {
  token: string | null;
};

const EngagementIndex = (props: Props) => {
  const [engagements, setEngagements] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [engagementToUpdate, setEngagementToUpdate] = useState({
    id: '',
    engagementNote: '',
    date: '',
    accountId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchEngagements = () => {
    fetch(`${APIURL}/engagement/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((engagement) => {
        setEngagements(engagement);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editEngagement = (engagement: Engagement) => {
    setEngagementToUpdate(engagement);
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
    fetchEngagements();
  }, []);

  return (
    <>
      <Container>
        {showLoading()}
        <EngagementTable
          token={props.token || ''}
          engagements={engagements}
          fetchEngagements={fetchEngagements}
          createActive={createActive}
          updateActive={updateActive}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          editEngagement={editEngagement}
        />
      </Container>
    </>
  );
};

export default EngagementIndex;

export const Container = styled.div`
  height: 220px;
  overflow: scroll;
`;
