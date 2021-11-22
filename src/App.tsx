import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './Components/Styles/Global';
import Header from './Components/Navigation/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './Components/Pages/Home';
import Login from './Components/Authorization/Login';
import Routes from './Routes';

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
  sessionToken?: string | null;
};

const App = (props: Props) => {
  const [sessionToken, setSessionToken] = useState<string | null>('');
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }

    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');

      if (!user) return;

      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };

  const updateUser = (newUser: User) => {
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  return (
    <Router>
      <GlobalStyle />
      <Header sessionToken={sessionToken} clearToken={clearToken} />
      <>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route
            path='/login'
            component={() =>
              sessionToken ? (
                <Redirect to='/dashboard' />
              ) : (
                <Login updateToken={updateToken} updateUser={updateUser} />
              )
            }
          />
          {currentUser && (
            <Routes sessionToken={sessionToken} user={currentUser} />
          )}
        </Switch>
      </>
    </Router>
  );
};

export default App;
