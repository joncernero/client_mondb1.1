import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from './Displays/Dashboard';
import UserIndex from './Components/Contents/Users/UserIndex';
import AccountDisplay from './Displays/AccountDisplay';

type Props = {
  sessionToken: string | null;
};

const Router = (props: Props) => {
  const protectedViews = (pageToShow: string) => {
    let component;

    if (pageToShow === 'dashboard') {
      component = <Dashboard token={props.sessionToken} />;
    }

    if (pageToShow === 'user') {
      component = <UserIndex token={props.sessionToken} />;
    }

    if (pageToShow === 'accountdisplay') {
      component = <AccountDisplay token={props.sessionToken} />;
    }

    return localStorage.getItem('token') ? component : <Redirect to='/Login' />;
  };

  return (
    <>
      <Route path='/dashboard'>{protectedViews('dashboard')}</Route>
      <Route path='/user'>{protectedViews('user')}</Route>
      {/* change to accountId */}
      <Route path='/account/:id'>{protectedViews('accountdisplay')}</Route>
    </>
  );
};

export default Router;
