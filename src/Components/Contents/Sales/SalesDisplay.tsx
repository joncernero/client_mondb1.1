import React, { useState } from 'react';
import SalesCreate from './SalesCreate';
import SalesEdit from './SalesEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { Sales } from '../../../Types/sales';

type Props = {
  token: string;
  sales: Sales[];
  fetchSales: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editSales: Function;
};

const SalesDisplay = (props: Props) => {
  const [editingSales, setEditingSales] = useState<Sales | undefined>();

  const SalesMapper = () => {
    return props.sales.map((sales: Sales, index) => {
      return (
        <ContentContainer key={index}>
          <ItemContainer>
            <label>PPC Sales Rep:</label>
            <p>{sales.ppcSales}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Segment:</label>
            <p>{sales.segment}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Industry:</label>
            <p>{sales.industry}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Region:</label>
            <p>{sales.region}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Customer ATS:</label>
            <p>{sales.ats}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Sales Channel:</label>
            <p>{sales.salesChannel}</p>
          </ItemContainer>
          <ItemContainer>
            <label>Primary Sales Rep:</label>
            <p>{sales.primarySales}</p>
          </ItemContainer>
          <EditButton
            onClick={() => {
              setEditingSales(sales);
              props.editSales();
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
        <SalesCreate
          token={props.token}
          fetchSales={props.fetchSales}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <SalesContainer>
        <Title>
          <h1>Sales</h1>
        </Title>
        <>
          {props.sales.length > 0 ? (
            SalesMapper()
          ) : (
            <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
          )}
        </>
      </SalesContainer>
      {props.updateActive && editingSales ? (
        <SalesEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          fetchSales={props.fetchSales}
          salesToUpdate={editingSales}
        />
      ) : null}
    </>
  );
};

export default SalesDisplay;

export const SalesContainer = styled.div`
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
  padding: 5px;

  &:hover {
    background: transparent;
    color: #59328c;
    border: 2px solid #59328c;
  }
`;
