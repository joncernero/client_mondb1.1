import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import ActivityCreate from './ActivityCreate';
import ActivityEdit from './ActivityEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  campaignManager: string;
  role: string;
};

type Activity = {
  id: string;
  activityNotes: string;
  dueDate: string;
  accountId: string;
  userId: string;
};

type Props = {
  token: string;
  users: User[];
  activities: Activity[];
  fetchActivities: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: Function;
  toggleEditOn: Function;
  editActivity: Function;
};

const ActivityTable = (props: Props) => {
  const [editingActivity, setEditingActivity] = useState<
    Activity | undefined
  >();

  const DeleteActivity = (activity: Activity) => {
    console.log(activity.id);
    fetch(`${APIURL}/activity/delete/${activity.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchActivities());
  };

  const FormatDate = (date: any) => {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
  };

  const ActivityMapper = () => {
    return props.activities.map((activity: Activity, index) => {
      return (
        <tr key={index}>
          <td>{activity.activityNotes}</td>
          <td>{FormatDate(activity.dueDate)}</td>
          <td>
            {props.users.map((user: User) => {
              return user.id === activity.userId ? user.campaignManager : null;
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
    });
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
        <div>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </div>
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

  div {
    align-self: flex-end;
    margin: 10px 25px 5px 0;
    font-size: 20px;

    &:hover {
      color: #c2abe1;
    }
  }
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  height: 200px;
  padding: 5px 25px 25px 25px;
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
    width: 40%;
    overflow: wrap;
  }

  thead th:nth-child(2) {
    width: 10%;
    text-align: center;
  }

  thead th:nth-child(3) {
    width: 30%;
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
