import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import EngagementCreate from './EngageCreate';
import EngagementEdit from './EngageEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Engagement = {
  id: string;
  engagementNote: string;
  date: string;
  accountId: string;
};

type Props = {
  token: string;
  engagements: Engagement[];
  fetchEngagements: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: Function;
  toggleEditOn: Function;
  editEngagement: Function;
};

const EngagementTable = (props: Props) => {
  const [editingEngagement, setEditingEngagement] = useState<
    Engagement | undefined
  >();

  const DeleteEngagement = (engagement: Engagement) => {
    fetch(`${APIURL}/engagement/delete/${engagement.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchEngagements());
  };

  const FormatDate = (date: any) => {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
  };

  const EngagementMapper = () => {
    return props.engagements.map((engagement: Engagement, index) => {
      return (
        <tr key={index}>
          <td>{engagement.engagementNote}</td>
          <td>{FormatDate(engagement.date)}</td>
          <td>
            <FiIcons.FiEdit2
              onClick={() => {
                setEditingEngagement(engagement);
                props.editEngagement();
                props.toggleEditOn();
              }}
            />
          </td>
          <td>
            <FiIcons.FiTrash
              onClick={() => {
                DeleteEngagement(engagement);
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
        <EngagementCreate
          token={props.token}
          fetchEngagements={props.fetchEngagements}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <EngageContainer>
        <Title>
          <h1>Engagements</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th scope='col'>Engagements</th>
                <th scope='col'>Date</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>{EngagementMapper()}</tbody>
          </Table>
        </TableContainer>
      </EngageContainer>
      {props.updateActive && editingEngagement ? (
        <EngagementEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          engagementToUpdate={editingEngagement}
          fetchEngagements={props.fetchEngagements}
        />
      ) : null}
    </>
  );
};

export default EngagementTable;

export const EngageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  color: #59328c;
  justify-content: space-between;
  margin: 0 15px 15px 15px;
`;

export const TableContainer = styled.div`
  overflow: scroll;
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 150%;
  /* height: 200px; */
  padding: 5px 5px 25px 5px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background: #59328c;
    width: 100%;
  }

  th {
    color: #ffffff;
    padding: 10px;
  }

  thead th:nth-child(1) {
    text-align: left;
    width: 75%;
    overflow: wrap;
  }

  thead th:nth-child(2) {
    width: 10%;
    text-align: center;
  }

  thead th:nth-child(3) {
    width: 10%;
    text-align: center;
  }

  tbody tr {
    &:hover {
      background: #c2abe1;
      color: #ffffff;
    }
  }

  tbody tr:nth-child(even) {
    background: #f3f3f3;

    &:hover {
      background: #c2abe1;
    }
  }

  tbody td:nth-child(1) {
    text-align: left;
  }

  tbody td {
    text-align: center;
    padding: 5px;
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
