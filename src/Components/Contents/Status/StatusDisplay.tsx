import React, { useState } from 'react';
import StatusCreate from './StatusCreate';
import StatusEdit from './StatusEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { Status } from '../../../Types/status';

type Props = {
  token: string | null;
  status: Status[];
  fetchStatus: Function;
  editStatus: Function;
  toggleCreateOn: Function;
  toggleEditOn: Function;
  createActive: boolean;
  updateActive: boolean;
};

const StatusDisplay = (props: Props) => {
  const [editingStatus, setEditingStatus] = useState<Status | undefined>();

  const StatusMapper = () => {
    return props.status.map((status: Status, index) => {
      return (
        <div key={index}>
          <div>
            <label>At Risk at Onset:</label>
            <p>{status.atRiskAtOnset}</p>
          </div>
          <div>
            <label>Account State:</label>
            <p>{status.accountState}</p>
          </div>
          <div>
            <label>Intro Status:</label>
            <p>{status.introStatus}</p>
          </div>
          <div>
            <label>Health:</label>
            <p>{status.health}</p>
          </div>
          <div>
            <label>Churn Date:</label>
            <p>{status.churnDate}</p>
          </div>
          <div>
            <label>Close Notes:</label>
            <p>{status.closeNotes}</p>
          </div>
          <div>
            <button
              onClick={() => {
                setEditingStatus(status);
                props.editStatus();
                props.toggleEditOn();
              }}>
              Edit Status
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {props.createActive ? (
        <StatusCreate
          token={props.token}
          fetchStatus={props.fetchStatus}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <StatusContainer>
        <Title>
          <h1>Status</h1>
        </Title>
        <Container>
          <>
            {props.status.length > 0 ? (
              StatusMapper()
            ) : (
              <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
            )}
          </>
        </Container>
      </StatusContainer>
      {props.updateActive && editingStatus ? (
        <StatusEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchStatus={props.fetchStatus}
          statusToUpdate={editingStatus}
        />
      ) : null}
    </>
  );
};

export default StatusDisplay;

export const StatusContainer = styled.div`
  border: 3px solid #59328c;
  border-radius: 10px;
  margin-top: 15px;
  color: #59328c;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 10px 5px 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px 15px 10px;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    align-self: flex-start;
    margin-bottom: 10px;
    color: #59328c;
    font-weight: bold;
    margin: 0;
    /* width: 100%; */
  }

  h1 {
    color: #59328c;
    align-self: flex-start;
    margin: 0;
  }

  p {
    color: #000000;
    margin: 0 0 10px 0;
  }

  button {
    height: 35px;
    width: 100px;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    background: #59328c;
    border-radius: 5px;
    text-align: center;
    margin: 10px 0;
    padding: 5px;

    &:hover {
      background: transparent;
      color: #59328c;
      border: 2px solid #59328c;
    }
  }
`;
