import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import ActivityTable from './ActivityTable';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';
import { Activity } from '../../../Types/activity';

type Props = {
  token: string | null;
};

const ActivityIndex = (props: Props) => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [activityToUpdate, setActivityToUpdate] = useState({
    id: '',
    activityNotes: '',
    dueDate: '',
    accountId: '',
    userId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = () => {
    fetch(`${APIURL}/activity/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((activity) => {
        setActivities(activity);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editActivity = (activity: Activity) => {
    setActivityToUpdate(activity);
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
  const fetchUsers = () => {
    fetch(`${APIURL}/user`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        setUsers(user);
      });
  };

  useEffect(() => {
    fetchActivities();
    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        {showLoading()}
        <ActivityTable
          token={props.token || ''}
          users={users}
          activities={activities}
          fetchActivities={fetchActivities}
          createActive={createActive}
          updateActive={updateActive}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          editActivity={editActivity}
        />
      </Container>
    </>
  );
};

export default ActivityIndex;

export const Container = styled.div`
  height: 220px;
  width: 100%;
`;
