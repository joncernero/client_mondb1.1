import React, { useState } from 'react';
import ImplementCreate from './ImplementCreate';
import ImplementEdit from './ImplementEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

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
        <div key={index}>
          <div>
            <label>Mobile Optimized:</label>
            <p>{implement.mobileOptimized}</p>
          </div>
          <div>
            <label>Jobs URL:</label>
            <p>{implement.jobsURL}</p>
          </div>
          <div>
            <label>Pixel Status:</label>
            <p>{implement.pixelStatus}</p>
          </div>
          <div>
            <label>Source Tag:</label>
            <p>{implement.sourceTag}</p>
          </div>
          <div>
            <label>Bid Optimizer:</label>
            <p>{implement.bidOptimizer}</p>
          </div>
          <div>
            <label>AwM:</label>
            <p>{implement.awm}</p>
          </div>
          <div>
            <label>Military:</label>
            <p>{implement.military}</p>
          </div>
          <div>
            <label>EJB:</label>
            <p>{implement.ejb}</p>
          </div>
          <div>
            <label>GUID:</label>
            <p>{implement.guid}</p>
          </div>
          <div>
            <label>Eligible For Free:</label>
            <p>{implement.eligibleForFree}</p>
          </div>
          <EditButton
            onClick={() => {
              setEditingImplementation(implement);
              props.editImplementation();
              props.toggleEditOn();
            }}>
            Edit Implementation
          </EditButton>
        </div>
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
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <Container>
          <>{ImplementMapper()}</>
        </Container>
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
  display: grid;
  place-items: center;
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
