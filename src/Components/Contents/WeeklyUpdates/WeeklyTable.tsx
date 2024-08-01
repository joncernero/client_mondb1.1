import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import WeeklyCreate from './WeeklyCreate';
import WeeklyEdit from './WeeklyEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { WeeklyUpdate } from '../../../Types/weeklyUpdate';
import { Account } from '../../../Types/account';

type Props = {
  token: string;
  accounts: Account[];
  weeklyUpdates: WeeklyUpdate[];
  fetchWeeklies: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editWeeklyUpdate: Function;
};

const WeeklyUpdateTable = (props: Props) => {
  const [editingWeeklyUpdate, setEditingWeeklyUpdate] = useState<
    WeeklyUpdate | undefined
  >();

  const DeleteWeekly = (weeklyUpdate: WeeklyUpdate) => {
    fetch(`${APIURL}/weeklyupdate/delete/${weeklyUpdate.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then(() => props.fetchWeeklies())
      .catch((error) => console.log(error));
  };

  const FormatDate = (date: any) => {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
  };

  const WeeklyMapper = () => {
    return props.weeklyUpdates.length > 0
      ? props.weeklyUpdates.map((weeklyUpdate: WeeklyUpdate, index) => {
          return (
            <tr key={index}>
              <td>{weeklyUpdate.weeklyUpdate}</td>
              <td>{weeklyUpdate.jobCount}</td>
              <td>{weeklyUpdate.activeCampaigns}</td>
              <td>{FormatDate(weeklyUpdate.date)}</td>
              <td>
                <FiIcons.FiEdit2
                  onClick={() => {
                    setEditingWeeklyUpdate(weeklyUpdate);
                    props.editWeeklyUpdate();
                    props.toggleEditOn();
                  }}
                />
              </td>
              <td>
                <FiIcons.FiTrash
                  onClick={() => {
                    DeleteWeekly(weeklyUpdate);
                  }}
                />
              </td>
            </tr>
          );
        })
      : null;
  };

  return (
    <>
      {props.createActive ? (
        <WeeklyCreate
          token={props.token}
          fetchWeeklies={props.fetchWeeklies}
          toggleCreateOn={props.toggleCreateOn}
          accounts={props.accounts}
        />
      ) : null}
      <WeeklyContainer>
        <Title>
          <h1>Weekly Updates</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th scope='col'>WeeklyUpdate</th>
                <th scope='col'>Job Count</th>
                <th scope='col'>Active Campaigns</th>
                <th scope='col'>Date</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>{WeeklyMapper()}</tbody>
          </Table>
        </TableContainer>
      </WeeklyContainer>
      {props.updateActive && editingWeeklyUpdate ? (
        <WeeklyEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          weeklyToUpdate={editingWeeklyUpdate}
          accounts={props.accounts}
          fetchWeeklies={props.fetchWeeklies}
        />
      ) : null}
    </>
  );
};

export default WeeklyUpdateTable;

export const WeeklyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  width: 100%;
  height: 100%;
  padding: 5px 5px 10px 5px;
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
    width: 60%;
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
