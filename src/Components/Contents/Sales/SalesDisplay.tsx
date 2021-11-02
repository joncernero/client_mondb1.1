import React, { useState } from 'react';
import SalesCreate from './SalesCreate';
import SalesEdit from './SalesEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Sales = {
  id: string;
  ppcSales: string;
  segment: string;
  industry: string;
  region: string;
  ats: string;
  salesChannel: string;
  primarySales: string;
  accountId: string;
};

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
        <>
          <Container key={index}>
            <div>
              <label>PPC Sales Rep:</label>
              <p>{sales.ppcSales}</p>
            </div>
            <div>
              <label>Segment:</label>
              <p>{sales.segment}</p>
            </div>
            <div>
              <label>Industry:</label>
              <p>{sales.industry}</p>
            </div>
            <div>
              <label>Region:</label>
              <p>{sales.region}</p>
            </div>
            <div>
              <label>Customer ATS:</label>
              <p>{sales.ats}</p>
            </div>
            <div>
              <label>Sales Channel:</label>
              <p>{sales.salesChannel}</p>
            </div>
            <div>
              <label>Primary Sales Rep:</label>
              <p>{sales.primarySales}</p>
            </div>
          </Container>
          <EditButton
            onClick={() => {
              setEditingSales(sales);
              props.editSales();
              props.toggleEditOn();
            }}>
            Edit Campaign
          </EditButton>
        </>
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
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <>{SalesMapper()}</>
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
