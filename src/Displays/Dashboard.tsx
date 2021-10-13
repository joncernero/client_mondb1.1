import React from 'react';
import AccountIndex from '../Components/Contents/Accounts/AccountIndex';

type Props = {
  token: string | null;
};
const Dashboard = (props: Props) => {
  return (
    <>
      <AccountIndex token={props.token} />
    </>
  );
};

export default Dashboard;
