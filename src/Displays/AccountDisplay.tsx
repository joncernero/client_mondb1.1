import React from 'react';
import SingleViewIndex from '../Components/Contents/Accounts/SingleViewIndex';

type Props = {
  token: string | null;
};

const AccountDisplay = (props: Props) => {
  return <SingleViewIndex token={props.token} />;
};

export default AccountDisplay;
