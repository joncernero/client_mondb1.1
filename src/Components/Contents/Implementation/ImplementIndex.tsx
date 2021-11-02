import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import ImplementDisplay from './ImplementDisplay';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';

type Implementation = {
  id: string;
  mobileOptimized: string;
  jobsURL: string;
  pixelStatus: string;
  sourceTag: string;
  bidOptimizer: string;
  awm: string;
  military: string;
  ejb: string;
  guid: string;
  eligibleForFree: string;
};

type Props = {
  token: string | null;
};

function ImplementIndex(props: Props) {
  const [implementation, setImplementation] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [implementToUpdate, setImplementToUpdate] = useState({
    id: '',
    mobileOptimized: '',
    jobsURL: '',
    pixelStatus: '',
    sourceTag: '',
    bidOptimizer: '',
    awm: '',
    military: '',
    ejb: '',
    guid: '',
    eligibleForFree: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchImplementation = () => {
    fetch(`${APIURL}/implementation/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((implement) => {
        setImplementation(implement);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editImplementation = (implement: Implementation) => {
    setImplementToUpdate(implement);
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
    fetchImplementation();
  }, []);

  return (
    <>
      {showLoading()}
      <>
        <ImplementDisplay
          token={props.token || ''}
          implementation={implementation}
          fetchImplementation={fetchImplementation}
          editImplementation={editImplementation}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </>
    </>
  );
}

export default ImplementIndex;
