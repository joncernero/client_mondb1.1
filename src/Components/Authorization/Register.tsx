import React, { useState } from 'react';
import APIURL from '../../Utilities/Environments';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Props = {
  token: string | null;
  fetchUsers: Function;
};

const Register = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [campaignManager, setCampaignManager] = useState('');
  const [role, setRole] = useState('');

  const handleUserSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(`${APIURL}/user/create`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        campaignManager: campaignManager,
        role: role,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setCampaignManager('');
        setRole('');
      })
      .then(() => {
        props.fetchUsers();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h1>Create User</h1>
      <form onSubmit={handleUserSubmit} id='createUser'>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            type='email'
            placeholder='email@test.com'
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            type='password'
            minLength={5}
            placeholder='password'
            value={password}
            required
          />
        </div>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            name='firstName'
            minLength={1}
            placeholder='John'
            value={firstName}
            required
          />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            name='lastName'
            minLength={1}
            placeholder='Doe'
            value={lastName}
            required
          />
        </div>
        <div>
          <label htmlFor='role'>Role</label>
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            name='role'
            required>
            <option value='default'></option>
            <option value='admin'>admin</option>
            <option value='user'>user</option>
          </select>
        </div>
      </form>
      <button type='submit' form='createUser'>
        <FiIcons.FiPlusSquare />
      </button>
    </Container>
  );
};

export default Register;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  border: 2px solid #59328c;
  border-radius: 10px;

  h1 {
    color: #59328c;
    align-self: flex-start;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
  }

  form {
    color: #283747;
    margin: 10px;
    display: flex;
    flex-direction: row;
  }

  label {
    align-self: flex-start;
    margin-bottom: 0.5em;
    color: #59328c;
    text-align: left;
    font-weight: bold;
  }

  input {
    align-self: flex-start;
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    margin-bottom: 1em;
  }

  select {
    align-self: flex-start;
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    margin-bottom: 1em;
  }

  button {
    align-self: flex-end;
    font-size: 30px;
    border: none;
    background: none;

    &:hover {
      background: transparent;
      color: #c2abe1;
    }
  }
`;
