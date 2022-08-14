import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <div>
        <h1>AccountHub</h1>
        <h3>Campaign Manager Resource</h3>
      </div>
    </Container>
  );
};

export default Home;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 100px;
    color: #59328c;
  }
  h3 {
    color: #c2abe1;
    letter-spacing: 3px;
  }
`;

// export const Image = styled.img.attrs({
//   src: `${#}`,
// })`
//   width: 10%;
//   height: auto;
//   margin: 200px 0 0 0;
// `;
