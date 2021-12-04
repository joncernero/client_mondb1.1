import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import ProviderDisplay from './ProviderDisplay';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';
import { Provider } from '../../../Types/provider';

type Props = {
  token: string | null;
};

const ProviderIndex = (props: Props) => {
  const [provider, setProvider] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [providerToUpdate, setProviderToUpdate] = useState({
    id: '',
    providerName: '',
    providerCode: '',
    providerId: '',
    providerType: '',
    jobSource: '',
    vendorSource: '',
    accountId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProvider = () => {
    fetch(`${APIURL}/provider/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((provider) => {
        setProvider(provider);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editProvider = (provider: Provider) => {
    setProviderToUpdate(provider);
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
    fetchProvider();
  }, []);

  return (
    <>
      {showLoading()}
      <>
        <ProviderDisplay
          token={props.token || ''}
          provider={provider}
          fetchProvider={fetchProvider}
          editProvider={editProvider}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </>
    </>
  );
};

export default ProviderIndex;
