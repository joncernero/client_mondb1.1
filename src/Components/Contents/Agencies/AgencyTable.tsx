import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import AgencyCreate from './AgencyCreate';
import AgencyEdit from './AgencyEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Agency = {
  id: string;
  agencyName: string;
};

type Props = {
  token: string;
  agencies: Agency[];
  fetchAgencies: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editAgency: Function;
};

const AgencyTable = (props: Props) => {
  const [editingAgency, setEditingAgency] = useState<Agency | undefined>();

  const deleteAgency = (agency: Agency) => {
    fetch(`${APIURL}/agency/delete/${agency.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then(() => props.fetchAgencies())
      .catch((error) => console.log(error));
  };

  const AgencyMapper = () => {
    return props.agencies.map((agency: Agency, index) => {
      return (
        <tr key={index}>
          <td>{agency.agencyName}</td>
          <td>
            <FiIcons.FiEdit2
              onClick={() => {
                setEditingAgency(agency);
                props.editAgency(agency);
                props.toggleEditOn();
              }}
            />
          </td>
          <td>
            <FiIcons.FiTrash
              onClick={() => {
                deleteAgency(agency);
              }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {props.createActive ? (
        <AgencyCreate
          token={props.token}
          fetchAgencies={props.fetchAgencies}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <AgencyContainer>
        <div>
          <h1>Agencies</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </div>
        <Table>
          <thead>
            <tr>
              <th scope='col'>Agency Name:</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{AgencyMapper()}</tbody>
        </Table>
      </AgencyContainer>
      {props.updateActive && editingAgency ? (
        <AgencyEdit
          agencyToUpdate={editingAgency}
          token={props.token}
          editAgency={props.editAgency}
          fetchAgencies={props.fetchAgencies}
          toggleEditOn={props.toggleEditOn}
        />
      ) : null}
    </>
  );
};

export default AgencyTable;

export const AgencyContainer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 25px 0 25px;
    color: #59328c;
  }
`;
export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  padding: 25px 25px;
  margin-bottom: 10px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background: #59328c;
    width: 100%;
  }

  thead th:nth-child(1) {
    text-align: left;
    width: 50%;
  }

  thead th:nth-child(2) {
    width: 10%;
  }

  thead th:nth-child(3) {
    width: 10%;
  }

  tbody tr {
    &:hover {
      background: #c2abe1;
      color: #ffffff;
      font-weight: bold;
    }
  }

  tbody tr:nth-child(even) {
    background: #f3f3f3;

    &:hover {
      background: #c2abe1;
    }
  }

  th {
    color: #ffffff;
    padding: 15px;
  }

  tbody td {
  }

  td {
    padding: 15px;
    width: auto;
  }

  td:not(:first-child) {
    text-align: center;
  }

  button {
    padding: 5px 15px;
    border-radius: 5px;

    &:hover {
      background: #59328c;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;
