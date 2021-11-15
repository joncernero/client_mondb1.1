import React, { useState } from 'react';
import CampaignCreate from './CampaignCreate';
import CampaignEdit from './CampaignEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Campaign = {
  id: string;
  campaignMethod: string;
  kpiRank: string;
  kpiNotes: string;
  onsetNotes: string;
  pacing: string;
  accountId: string;
};

type Props = {
  token: string;
  campaign: Campaign[];
  fetchCampaign: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editCampaign: Function;
};

const CampaignDisplay = (props: Props) => {
  const [editingCampaign, setEditingCampaign] = useState<
    Campaign | undefined
  >();

  const CampaignMapper = () => {
    return props.campaign.map((campaign: Campaign, index) => {
      return (
        <div key={index}>
          <div>
            <label>Campaign Method:</label>
            <p>{campaign.campaignMethod}</p>
          </div>
          <div>
            <label>KPI Rank:</label>
            <p>{campaign.kpiRank}</p>
          </div>
          <div>
            <label>KPI Notes:</label>
            <p>{campaign.kpiNotes}</p>
          </div>
          <div>
            <label>Onset Notes:</label>
            <p>{campaign.onsetNotes}</p>
          </div>
          <div>
            <label>Campaign Pacing Type:</label>
            <p>{campaign.pacing}</p>
          </div>
          <EditButton
            onClick={() => {
              setEditingCampaign(campaign);
              props.editCampaign();
              props.toggleEditOn();
            }}>
            Edit Campaign
          </EditButton>
        </div>
      );
    });
  };

  return (
    <>
      {props.createActive ? (
        <CampaignCreate
          token={props.token}
          fetchCampaign={props.fetchCampaign}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <CampaignContainer>
        <Title>
          <h1>Campaign</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <Container>
          <>{CampaignMapper()}</>
        </Container>
      </CampaignContainer>
      {props.updateActive && editingCampaign ? (
        <CampaignEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchCampaign={props.fetchCampaign}
          campaignToUpdate={editingCampaign}
        />
      ) : null}
    </>
  );
};

export default CampaignDisplay;

export const CampaignContainer = styled.div`
  color: #59328c;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 15px 15px 15px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  div {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
  }

  label {
    align-self: flex-start;
    color: #59328c;
    font-weight: bold;
    margin: 0;
  }

  p {
    color: #000000;
    margin: 0 0 10px 5px;
  }
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 200px;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  background: #59328c;
  border-radius: 5px;
  margin: 15px;
  padding: 5px;

  &:hover {
    background: transparent;
    color: #59328c;
    border: 2px solid #59328c;
  }
`;
