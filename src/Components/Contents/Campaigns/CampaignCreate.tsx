import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Props = {
  token: string | null;
  fetchCampaign: Function;
  toggleCreateOn: () => void;
};

const CampaignCreate = (props: Props) => {
  const [campaignMethod, setCampaignMethod] = useState('');
  const [kpiRank, setKpiRank] = useState('');
  const [kpiNotes, setKpiNotes] = useState('');
  const [onsetNotes, setOnsetNotes] = useState('');
  const [pacing, setPacing] = useState('');
  const [accountId, setAccountId] = useState('');
  const { id } = useParams<{ id?: string }>();

  const fetchCampaignData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/campaign/create`, {
      method: 'Post',
      body: JSON.stringify({
        campaignMethod: campaignMethod,
        kpiRank: kpiRank,
        kpiNotes: kpiNotes,
        onsetNotes: onsetNotes,
        pacing: pacing,
        accountId: id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setCampaignMethod('');
        setKpiRank('');
        setKpiNotes('');
        setOnsetNotes('');
        setPacing('');
        setAccountId('');
      })
      .then(() => {
        props.fetchCampaign();
        props.toggleCreateOn();
      });
  };

  const CampaignMethodArray = [
    'Automated',
    'Manual',
    'Partner',
    'Programmatic',
    'Wholesale',
    'COVID',
  ];

  const PacingArray = [
    'Daily',
    'Weekly-Cap',
    'Weekly',
    'Monthly',
    'Monthly-Cap',
  ];

  const KPIArray = [
    'Not Discussed',
    'Yes-On target',
    'Yes-Off target',
    'No-Verbal Ok',
    'No-Unknown',
    'No-Off Target',
  ];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchCampaignData}>
        <h1>Add Campaign Info</h1>
        <div>
          <div>
            <label htmlFor='campaignMethod'>Campaign Method:</label>
            <select onChange={(e) => setCampaignMethod(e.target.value)}>
              <option value='default'></option>
              {CampaignMethodArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='kpiRank'>KPI Rank:</label>
            <select onChange={(e) => setKpiRank(e.target.value)}>
              <option value='default'></option>
              {KPIArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='kpiNotes'>KPI Notes:</label>
            <input
              name='kpiNotes'
              value={kpiNotes}
              onChange={(e) => setKpiNotes(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='onsetNotes'>Onset Notes:</label>
            <input
              name='onsetNotes'
              value={onsetNotes}
              onChange={(e) => setOnsetNotes(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='pacing'>Campaign Pacing Type:</label>
            <select onChange={(e) => setPacing(e.target.value)}>
              <option value='default'></option>
              {PacingArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type='submit'>Add Campaign Info</button>
      </form>
    </StyledModal>
  );
};

export default CampaignCreate;
