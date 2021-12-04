import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { Campaign } from '../../../Types/campaign';

type Props = {
  token: string | null;
  toggleEditOn: () => void;
  campaignToUpdate: Campaign;
  fetchCampaign: Function;
};

const CampaignEdit = (props: Props) => {
  const [editCampaignMethod, setEditCampaignMethod] = useState(
    props.campaignToUpdate.campaignMethod
  );
  const [editKpiRank, setEditKpiRank] = useState(
    props.campaignToUpdate.kpiRank
  );
  const [editKpiNotes, setEditKpiNotes] = useState(
    props.campaignToUpdate.kpiNotes
  );
  const [editOnsetNotes, setEditOnsetNotes] = useState(
    props.campaignToUpdate.onsetNotes
  );
  const [editPacing, setEditPacing] = useState(props.campaignToUpdate.pacing);

  const CampaignUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/campaign/update/${props.campaignToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        campaignMethod: editCampaignMethod,
        kpiRank: editKpiRank,
        kpiNotes: editKpiNotes,
        onsetNotes: editOnsetNotes,
        pacing: editPacing,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchCampaign();
        props.toggleEditOn();
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
      <Title>
        <h1>Add Campaign Info</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={CampaignUpdate} id='campUpdate'>
        <div>
          <div>
            <label htmlFor='campaignMethod'>Campaign Method:</label>
            <select onChange={(e) => setEditCampaignMethod(e.target.value)}>
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
            <select onChange={(e) => setEditKpiRank(e.target.value)}>
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
              value={editKpiNotes}
              onChange={(e) => setEditKpiNotes(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='onsetNotes'>Onset Notes:</label>
            <input
              name='onsetNotes'
              value={editOnsetNotes}
              onChange={(e) => setEditOnsetNotes(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='pacing'>Campaign Pacing Type:</label>
            <select onChange={(e) => setEditPacing(e.target.value)}>
              <option value='default'></option>
              {PacingArray.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <button type='submit' form='campUpdate'>
        Add Campaign Info
      </button>
    </StyledModal>
  );
};

export default CampaignEdit;
