import React, { useState } from 'react';
import APIURL from '../../Utilities/Environments';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  updateToken: (newToken: string) => void;
};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sessionToken) {
          props.updateToken(data.sessionToken);
          localStorage.setItem('token', data.sessionToken);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.user.role === 'admin') {
            history.push('/user');
            return;
          }
          history.push('/dashboard');
        } else {
          resetState();
        }
      })
      .catch((error) => console.log(error));
  };

  const resetState = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
          <button type='submit'>Login</button>
        </div>
      </form>
    </Container>
  );
};

export default Login;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;

  h1 {
    color: #59328c;
  }

  form {
    color: #59328c;
    display: block;
    width: 300px;
    margin: 10px auto;
  }

  label {
    margin-bottom: 0.5em;
    color: #59328c;
    display: block;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #59328c;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  button {
    height: 35px;
    width: 150px;
    color: #59328c;
    font-size: 15px;
    font-weight: bold;
    border: 2px solid #59328c;
    background: transparent;
    border-radius: 5px;
    margin: 15px;
    text-align: center;

    &:hover {
      background: #c2abe1;
      color: #ffffff;
      border: 2px solid #c2abe1;
    }
  }
  div {
    text-align: center;
  }
`;
