import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import Register from '../../Authorization/Register';
import UserEdit from './UserEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';
import { User } from '../../../Types/user';

type Props = {
  token: string | null;
  users: User[];
  fetchUsers: Function;
  editUser: Function;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  createActive: boolean;
};

const UserTable = (props: Props) => {
  const [editingUser, setEditingUser] = useState<User | undefined>();
  // const [updateActive, setUpdateActive] = useState(false);

  const deleteUser = (user: User) => {
    fetch(`${APIURL}/user/delete/${user.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    }).then(() => props.fetchUsers());
  };

  const UsersMapper = () => {
    return props.users.map((user: User, index) => {
      return (
        <tr key={index}>
          <td>{user.campaignManager}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <FiIcons.FiEdit2
              onClick={() => {
                setEditingUser(user);
                props.editUser(user);
                props.toggleEditOn();
              }}
            />
          </td>
          <td>
            <FiIcons.FiTrash
              onClick={() => {
                deleteUser(user);
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
        <Register
          token={props.token}
          fetchUsers={props.fetchUsers}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <UserContainer>
        <div>
          <h1>Campaign Managers</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </div>
        <Table>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'></th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>{UsersMapper()}</tbody>
        </Table>
      </UserContainer>
      {props.updateActive && editingUser ? (
        <UserEdit
          userToUpdate={editingUser}
          token={props.token}
          editUser={props.editUser}
          fetchUsers={props.fetchUsers}
          toggleEditOn={props.toggleEditOn}
        />
      ) : null}
    </>
  );
};

export default UserTable;

const UserContainer = styled.div`
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
    width: 30%;
  }

  thead th:nth-child(2) {
    width: 35%;
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
