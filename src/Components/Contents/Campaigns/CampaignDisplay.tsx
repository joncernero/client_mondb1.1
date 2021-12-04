import React, { useState } from 'react';
import CampaignCreate from './CampaignCreate';
import CampaignEdit from './CampaignEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { Campaign } from '../../../Types/campaign';

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
        <ContentContainer key={index}>
          <ItemContainer>
            <label>Campaign Method:</label>
            <p>{campaign.campaignMethod}</p>
          </ItemContainer>
          <ItemContainer>
            <label>KPI Rank:</label>
            <p>{campaign.kpiRank}</p>
          </ItemContainer>
          <ItemContainer>
            <label>KPI Notes:</label>
            <p>{campaign.kpiNotes}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Onset Notes:</label>
            <p>{campaign.onsetNotes}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Campaign Pacing Type:</label>
            <p>{campaign.pacing}</p>
          </ItemContainer>
          <EditButton
            onClick={() => {
              setEditingCampaign(campaign);
              props.editCampaign();
              props.toggleEditOn();
            }}>
            Edit Campaign
          </EditButton>
        </ContentContainer>
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
        </Title>
        <>
          {props.campaign.length > 0 ? (
            CampaignMapper()
          ) : (
            <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
          )}
        </>
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
  margin-bottom: 15px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;

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
  align-self: center;
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
