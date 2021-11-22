import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import WeeklyTable from './WeeklyTable';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';

type WeeklyUpdate = {
  id: string;
  weeklyUpdate: string;
  jobCount: number;
  activeCampaigns: number;
  date: string;
  accountId: string;
};

type Props = {
  token: string | null;
};

const WeeklyIndex = (props: Props) => {
  const [weeklyUpdates, setWeeklyUpdates] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [weeklyToUpdate, setWeeklyToUpdate] = useState({
    id: '',
    weeklyUpdate: '',
    jobCount: 0,
    activeCampaigns: 0,
    date: '',
    accountId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeeklies = () => {
    fetch(`${APIURL}/weeklyupdate/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((weeklyUpdate) => {
        setWeeklyUpdates(weeklyUpdate);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editWeeklyUpdate = (weeklyUpdate: WeeklyUpdate) => {
    setWeeklyToUpdate(weeklyUpdate);
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

  const fetchAccounts = () => {
    fetch(`${APIURL}/account`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((accounts) => {
        setAccounts(accounts);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchWeeklies();
    fetchAccounts();
  }, []);

  return (
    <>
      <Container>
        {showLoading()}
        <WeeklyTable
          token={props.token || ''}
          accounts={accounts}
          weeklyUpdates={weeklyUpdates}
          fetchWeeklies={fetchWeeklies}
          createActive={createActive}
          updateActive={updateActive}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          editWeeklyUpdate={editWeeklyUpdate}
        />
      </Container>
    </>
  );
};

export default WeeklyIndex;

export const Container = styled.div`
  height: 220px;
  width: 100%;
`;
