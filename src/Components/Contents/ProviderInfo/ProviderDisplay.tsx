import React, { useState } from 'react';
import ProviderCreate from './ProviderCreate';
import ProviderEdit from './ProviderEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Provider = {
  id: string;
  providerName: string;
  providerCode: string;
  providerId: string;
  providerType: string;
  jobSource: string;
  vendorSource: string;
  accountId: string;
};

type Props = {
  token: string;
  provider: Provider[];
  fetchProvider: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editProvider: Function;
};

const ProviderDisplay = (props: Props) => {
  const [editingProvider, setEditingProvider] = useState<
    Provider | undefined
  >();

  const ProviderMapper = () => {
    return props.provider.map((provider: Provider, index) => {
      return (
        <div key={index}>
          <div>
            <label>Provider Name:</label>
            <p>{provider.providerName}</p>
          </div>
          <div>
            <label>Provider Code:</label>
            <p>{provider.providerCode}</p>
          </div>
          <div>
            <label>Provider ID:</label>
            <p>{provider.providerId}</p>
          </div>
          <div>
            <label>Provider Type:</label>
            <p>{provider.providerType}</p>
          </div>
          <div>
            <label>Job Source:</label>
            <p>{provider.jobSource}</p>
          </div>
          <div>
            <label>Vendor Source:</label>
            <p>{provider.vendorSource}</p>
          </div>
          <EditButton
            onClick={() => {
              setEditingProvider(provider);
              props.editProvider();
              props.toggleEditOn();
            }}>
            Edit Provider
          </EditButton>
        </div>
      );
    });
  };

  return (
    <>
      {props.createActive ? (
        <ProviderCreate
          token={props.token}
          fetchProvider={props.fetchProvider}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <ProviderContainer>
        <Title>
          <h1>Provider</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <Container>
          <>{ProviderMapper()}</>
        </Container>
      </ProviderContainer>
      {props.updateActive && editingProvider ? (
        <ProviderEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchProvider={props.fetchProvider}
          providerToUpdate={editingProvider}
        />
      ) : null}
    </>
  );
};

export default ProviderDisplay;

export const ProviderContainer = styled.div`
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
  width: 125px;
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
