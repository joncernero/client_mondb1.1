import React, { useState } from 'react';
import ImplementCreate from './ImplementCreate';
import ImplementEdit from './ImplementEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { Implementation } from '../../../Types/implementation';

type Props = {
  token: string;
  implementation: Implementation[];
  fetchImplementation: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editImplementation: Function;
};

const ImplementDisplay = (props: Props) => {
  const [editingImplementation, setEditingImplementation] = useState<
    Implementation | undefined
  >();

  const ImplementMapper = () => {
    return props.implementation.map((implement: Implementation, index) => {
      return (
        <ContentContainer key={index}>
          <ItemContainer>
            <label>Mobile Optimized:</label>
            <p>{implement.mobileOptimized}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Jobs URL:</label>
            <p>{implement.jobsURL}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Pixel Status:</label>
            <p>{implement.pixelStatus}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Source Tag:</label>
            <p>{implement.sourceTag}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Bid Optimizer:</label>
            <p>{implement.bidOptimizer}</p>
          </ItemContainer>
          <ItemContainer>
            <label>AwM:</label>
            <p>{implement.awm}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Military:</label>
            <p>{implement.military}</p>
          </ItemContainer>
          <ItemContainer>
            <label>EJB:</label>
            <p>{implement.ejb}</p>
          </ItemContainer>
          <ItemContainer>
            <label>GUID:</label>
            <p>{implement.guid}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Eligible For Free:</label>
            <p>{implement.eligibleForFree}</p>
          </ItemContainer>
          <EditButton
            onClick={() => {
              setEditingImplementation(implement);
              props.editImplementation();
              props.toggleEditOn();
            }}>
            Edit Implementation
          </EditButton>
        </ContentContainer>
      );
    });
  };

  return (
    <>
      {props.createActive ? (
        <ImplementCreate
          token={props.token}
          fetchImplementation={props.fetchImplementation}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <ImplementContainer>
        <Title>
          <h1>Implementation</h1>
        </Title>
        <>
          {props.implementation.length > 0 ? (
            ImplementMapper()
          ) : (
            <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
          )}
        </>
      </ImplementContainer>
      {props.updateActive && editingImplementation ? (
        <ImplementEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchImplementation={props.fetchImplementation}
          implementToUpdate={editingImplementation}
        />
      ) : null}
    </>
  );
};

export default ImplementDisplay;

export const ImplementContainer = styled.div`
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
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 200px;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  background: #59328c;
  border-radius: 5px;
  padding: 10px;

  &:hover {
    background: transparent;
    color: #59328c;
    border: 2px solid #59328c;
  }
`;
