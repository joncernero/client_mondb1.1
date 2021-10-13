import React, { useState } from 'react';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import APIURL from '../../../Utilities/Environments';
import * as AiIcons from 'react-icons/ai';

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
  editUser: Function;
  userToUpdate: User;
  fetchUsers: Function;
};

const UserEdit = (props: Props, user: User) => {
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editCampaignManager, setEditCampaignManager] = useState('');
  // const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState('');
  const [updateActive, setUpdateActive] = useState(false);

  const UserUpdate = (e: React.SyntheticEvent): void => {
    console.log(props.userToUpdate.firstName);
    e.preventDefault();
    fetch(`${APIURL}/user/update/${props.userToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        firstName: editFirstName,
        lastName: editLastName,
        campaignManager: editCampaignManager,
        role: editRole,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchUsers();
        props.editUser();
        toggleEditOn();
      });
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  return (
    <>
      <StyledModal>
        <ModalClose
          onClick={() => {
            toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
        <form onSubmit={UserUpdate} id='editUser'>
          <h1>{`Update ${props.userToUpdate.firstName}`}</h1>
          <label htmlFor='firstName'>Edit First Name:</label>
          <input
            name='name'
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
          />
          <label htmlFor='lastName'>Edit Last Name:</label>
          <input
            name='lastName'
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          />
          <label htmlFor='role'>Edit Role:</label>
          <select
            onChange={(e) => setEditRole(e.target.value)}
            value={editRole}
            name='role'
            required>
            <option value='default'></option>
            <option value='admin'>admin</option>
            <option value='user'>user</option>
          </select>
        </form>
        <button type='submit' form='editUser'>
          Update
        </button>
      </StyledModal>
    </>
  );
};

export default UserEdit;
