import React from 'react';
import AccountIndex from '../Components/Contents/Accounts/AccountIndex';
import styled from 'styled-components';

type Props = {
  token: string | null;
};
const Dashboard = (props: Props) => {
  return (
    <Container>
      <AccountIndex token={props.token} />
    </Container>
  );
};

export default Dashboard;

export const Container = styled.div`
  padding: 0 200px;
`;
