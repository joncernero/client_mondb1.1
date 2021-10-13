import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import UserEdit from './UserEdit';
import { Table } from '../../Styles/Table';

type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  campaignManager: string;
  role: string;
};

type Props = {
  token: string | null;
  users: User[];
  fetchUsers: Function;
  editUser: Function;
  updateActive: boolean;
};

const UserTable = (props: Props) => {
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [updateActive, setUpdateActive] = useState(false);

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
            <button
              onClick={() => {
                setEditingUser(user);
                props.editUser(user);
                toggleEditOn();
              }}>
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                deleteUser(user);
              }}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th scope='col'>Campaign Manager</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>{UsersMapper()}</tbody>
      </Table>
      {props.updateActive && editingUser ? (
        <UserEdit
          userToUpdate={editingUser}
          token={props.token}
          editUser={props.editUser}
          fetchUsers={props.fetchUsers}
        />
      ) : null}
    </>
  );
};

export default UserTable;
