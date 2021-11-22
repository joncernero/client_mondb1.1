import React from 'react';
import AccountIndex from '../Components/Contents/Accounts/AccountIndex';
import styled from 'styled-components';
import { User } from '../Types/user';

type Props = {
  token: string | null;
  user: User;
};
const Dashboard = (props: Props) => {
  return (
    <Container>
      <AccountIndex token={props.token} user={props.user} />
    </Container>
  );
};

export default Dashboard;

export const Container = styled.div`
  padding: 0 200px;
`;
