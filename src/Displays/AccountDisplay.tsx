import React from 'react';
import SingleViewIndex from '../Components/Contents/Accounts/SingleViewIndex';
import StatusIndex from '../Components/Contents/Status/StatusIndex';
import SecondaryRouter from '../Displays/SecondaryRouter';
import ThirdRouter from '../Displays/ThirdRouter';
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
        <ThirdRouter token={props.token} />
        <FourthRouter token={props.token} />
      </ChildTwo>
    </Container>
  );
};

export default AccountDisplay;

export const Container = styled.div`
  display: grid;
  column-gap: 15px;
  grid-template-areas:
    'one two'
    'one two'
    'one two';
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

export const ChildOne = styled.div`
  grid-area: one;
  width: 25vw;
`;
export const ChildTwo = styled.div`
  grid-area: two;
  width: 70vw;
`;
