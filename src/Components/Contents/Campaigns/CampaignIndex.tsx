import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import CampaignDisplay from './CampaignDisplay';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';
import { Campaign } from '../../../Types/campaign';

type Props = {
  token: string | null;
};

function CampaignIndex(props: Props) {
  const [campaign, setCampaign] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [campaignToUpdate, setCampaignToUpdate] = useState({
    id: '',
    campaignMethod: '',
    kpiRank: '',
    kpiNotes: '',
    onsetNotes: '',
    pacing: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCampaign = () => {
    fetch(`${APIURL}/campaign/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((campaign) => {
        setCampaign(campaign);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editCampaign = (campaign: Campaign) => {
    setCampaignToUpdate(campaign);
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
    fetchCampaign();
  }, []);

  return (
    <>
      {showLoading()}
      <>
        <CampaignDisplay
          token={props.token || ''}
          campaign={campaign}
          fetchCampaign={fetchCampaign}
          editCampaign={editCampaign}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </>
    </>
  );
}

export default CampaignIndex;
