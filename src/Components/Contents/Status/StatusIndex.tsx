import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import StatusDisplay from './StatusDisplay';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';

type Status = {
  id: string;
  atRiskAtOnset: string;
  accountState: string;
  introStatus: string;
  health: string;
  churnDate: string;
  closeNotes: string;
  accountId: string;
};

type Props = {
  token: string | null;
};

const StatusIndex = (props: Props) => {
  const [status, setStatus] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [statusToUpdate, setStatusToUpdate] = useState({
    id: '',
    atRiskAtOnset: '',
    accountState: '',
    introStatus: '',
    health: '',
    churnDate: '',
    closeNotes: '',
    accountId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = () => {
    fetch(`${APIURL}/status/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((status) => {
        setStatus(status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editStatus = (status: Status) => {
    setStatusToUpdate(status);
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
    fetchStatus();
  }, []);

  return (
    <>
      {showLoading()}
      <>
        <StatusDisplay
          token={props.token}
          status={status}
          fetchStatus={fetchStatus}
          editStatus={editStatus}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </>
    </>
  );
};

export default StatusIndex;
