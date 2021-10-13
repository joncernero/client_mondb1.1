import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  row-gap: 50px;
  grid-template-areas:
    'one one'
    'one one'
    'one one'
    'two two';
  height: 90vh;
  width: auto;
`;

export const ChildOne = styled.div`
  grid-area: one;
  height: auto;
  width: 70vw;
  padding: 25px;

  div {
    display: flex;
    justify-content: flex-end;
  }

  button {
    height: 40px;
    width: 150px;
    color: #59328c;
    font-size: 15px;
    font-weight: bold;
    background: transparent;
    border-radius: 5px;
    margin: 25px;
    padding: 10px;

    &:hover {
      background: #c2abe1;
      color: #ffffff;
      border: 2px solid #c2abe1;
    }
  }
`;

export const ChildTwo = styled.div`
  grid-area: two;
  width: 60vw;
  align-self: center;
`;
