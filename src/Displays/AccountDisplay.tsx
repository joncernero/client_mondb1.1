import React from 'react';
import SingleViewIndex from '../Components/Contents/Accounts/SingleViewIndex';
import ActivityIndex from '../Components/Contents/Activities/ActivityIndex';
import EngagementIndex from '../Components/Contents/Engagements/EngageIndex';
import styled from 'styled-components';

type Props = {
  token: string | null;
};

const AccountDisplay = (props: Props) => {
  return (
    <Container>
      <ChildOne>
        <SingleViewIndex token={props.token} />
      </ChildOne>
      <ChildTwo>
        <ActivityIndex token={props.token} />
        <EngagementIndex token={props.token} />
      </ChildTwo>
    </Container>
  );
};

export default AccountDisplay;

export const Container = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-areas:
    'one two'
    'one three'
    'one four';
  width: 100%;
  padding: 20px;
`;

export const ChildOne = styled.div`
  grid-area: one;
  width: 100%;
`;
export const ChildTwo = styled.div`
  grid-area: two;
  width: 100%;
  margin-bottom: 10px;
`;
