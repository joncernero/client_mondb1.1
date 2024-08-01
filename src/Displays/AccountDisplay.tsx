import React from 'react';
import SingleViewIndex from '../Components/Contents/Accounts/SingleViewIndex';
import StatusIndex from '../Components/Contents/Status/StatusIndex';
import SecondaryRouter from '../Displays/SecondaryRouter';
// import ThirdRouter from '../Displays/ThirdRouter';
import FourthRouter from '../Displays/FourthRouter';
import styled from 'styled-components';

type Props = {
  token: string | null;
};

const AccountDisplay = (props: Props) => {
  return (
    <Container>
      <ChildOne>
        <SingleViewIndex token={props.token} />
        <StatusIndex token={props.token} />
      </ChildOne>
      <ChildTwo>
        <SecondaryRouter token={props.token} />
        <FourthRouter token={props.token} />
      </ChildTwo>
    </Container>
  );
};

export default AccountDisplay;

export const Container = styled.div`
  display: flex;
  column-gap: 5px;
  margin: 0 auto;
  min-width: 100vw;
  min-height: 100vh;
`;

export const ChildOne = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  margin: 10px 0 0 50px;
`;
export const ChildTwo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 10px 50px 0 5px;
`;
