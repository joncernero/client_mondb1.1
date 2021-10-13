import React, { useState } from 'react';
import APIURL from '../../Utilities/Environments';
import { useHistory } from 'react-router-dom';
import { Container } from '../Styles/LoginContainer';

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
