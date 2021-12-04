import React, { useState } from 'react';
import ProviderCreate from './ProviderCreate';
import ProviderEdit from './ProviderEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { Provider } from '../../../Types/provider';

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
        <ContentContainer key={index}>
          <ItemContainer>
            <label>Provider Name:</label>
            <p>{provider.providerName}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Provider Code:</label>
            <p>{provider.providerCode}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Provider ID:</label>
            <p>{provider.providerId}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Provider Type:</label>
            <p>{provider.providerType}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Job Source:</label>
            <p>{provider.jobSource}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Vendor Source:</label>
            <p>{provider.vendorSource}</p>
          </ItemContainer>
          <EditButton
            onClick={() => {
              setEditingProvider(provider);
              props.editProvider();
              props.toggleEditOn();
            }}>
            Edit Provider
          </EditButton>
        </ContentContainer>
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
        </Title>
        <>
          {props.provider.length > 0 ? (
            ProviderMapper()
          ) : (
            <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
          )}
        </>
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
  text-align: center;
  height: 35px;
  width: 200px;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  background: #59328c;
  border-radius: 5px;
  padding: 5px;

  &:hover {
    background: transparent;
    color: #59328c;
    border: 2px solid #59328c;
  }
`;
