import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import ActivityCreate from './ActivityCreate';
import ActivityEdit from './ActivityEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { User } from '../../../Types/user';
import { Activity } from '../../../Types/activity';

type Props = {
  token: string;
  users: User[];
  activities: Activity[];
  fetchActivities: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editActivity: Function;
};

const ActivityTable = (props: Props) => {
  const [editingActivity, setEditingActivity] = useState<
    Activity | undefined
  >();

  const DeleteActivity = (activity: Activity) => {
    fetch(`${APIURL}/activity/delete/${activity.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then(() => props.fetchActivities())
      .catch((error) => console.log(error));
  };

  const FormatDate = (date: any) => {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
  };

  const ActivityMapper = () => {
    return props.activities.length > 0
      ? props.activities.map((activity: Activity, index) => {
          return (
            <tr key={index}>
              <td>{activity.activityNotes}</td>
              <td>{FormatDate(activity.dueDate)}</td>
              <td>
                {props.users.map((user: User) => {
                  return user.id === activity.userId
                    ? user.campaignManager
                    : null;
                })}
              </td>
              <td>
                <FiIcons.FiEdit2
                  onClick={() => {
                    setEditingActivity(activity);
                    props.editActivity();
                    props.toggleEditOn();
                  }}
                />
              </td>
              <td>
                <FiIcons.FiTrash
                  onClick={() => {
                    DeleteActivity(activity);
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
        <ActivityCreate
          token={props.token}
          fetchActivities={props.fetchActivities}
          toggleCreateOn={props.toggleCreateOn}
          users={props.users}
        />
      ) : null}
      <ActivityContainer>
        <Title>
          <h1>Activities</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th scope='col'>Activities</th>
                <th scope='col'>DueDate</th>
                <th scope='col'>Campaign Manager</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>{ActivityMapper()}</tbody>
          </Table>
        </TableContainer>
      </ActivityContainer>
      {props.updateActive && editingActivity ? (
        <ActivityEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          activityToUpdate={editingActivity}
          users={props.users}
          fetchActivities={props.fetchActivities}
        />
      ) : null}
    </>
  );
};

export default ActivityTable;

export const ActivityContainer = styled.div`
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
    width: 55%;
    overflow: wrap;
  }

  thead th:nth-child(2) {
    width: 10%;
    text-align: center;
  }

  thead th:nth-child(3) {
    width: 20%;
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
