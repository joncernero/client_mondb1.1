import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import IoCreate from './IoCreate';
import IoEdit from './IoEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Agency = {
  id: string;
  agencyName: string;
};

type Io = {
  id: string;
  agencyIO: string;
  ioBudget: number;
  ioSpend: number;
  agencyId: string;
};

type Props = {
  token: string;
  ios: Io[];
  fetchIos: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editIo: Function;
  agencies: Agency[];
};

const IoTable = (props: Props) => {
  const [editingIo, setEditingIo] = useState<Io | undefined>();

  const deleteIO = (io: Io) => {
    fetch(`${APIURL}/io/delete/${io.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then(() => props.fetchIos())
      .catch((error) => console.log(error));
  };

  const IoMapper = () => {
    return props.ios.map((io: Io, index) => {
      return (
        <tr key={index}>
          <td>{io.agencyIO}</td>
          <td>{io.ioBudget}</td>
          <td>{io.ioSpend}</td>
          <td>
            {props.agencies.map((agency: Agency) => {
              return agency.id === io.agencyId ? agency.agencyName : null;
            })}
          </td>
          <td>
            <FiIcons.FiEdit2
              onClick={() => {
                setEditingIo(io);
                props.editIo(io);
                props.toggleEditOn();
              }}
            />
          </td>
          <td>
            <FiIcons.FiTrash
              onClick={() => {
                deleteIO(io);
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
        <IoCreate
          token={props.token}
          fetchIos={props.fetchIos}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <IoContainer>
        <div>
          <h1>Insertion Orders</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </div>
        <Table>
          <thead>
            <tr>
              <th scope='col'>IO #:</th>
              <th scope='col'>IoBudget:</th>
              <th scope='col'>IoSpend:</th>
              <th scope='col'>Agency:</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{IoMapper()}</tbody>
        </Table>
      </IoContainer>
      {props.updateActive && editingIo ? (
        <IoEdit
          ioToUpdate={editingIo}
          token={props.token}
          editIo={props.editIo}
          fetchIos={props.fetchIos}
          toggleEditOn={props.toggleEditOn}
          agencies={props.agencies}
        />
      ) : null}
    </>
  );
};

export default IoTable;

export const IoContainer = styled.div`
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
    width: 20%;
  }

  thead th:nth-child(2) {
    width: 20%;
  }

  thead th:nth-child(3) {
    width: 20%;
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
