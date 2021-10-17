import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
from {
    transform: rotate(0deg);
}

to {
    transform: rotate(360deg);
}
`;

export const Spinner = styled.div`
  animation: ${rotate360} is linear infinite;
  transform: translateZ(0);

  border-top: 2px solid #59328c;
  border-right: 2px solid #59328c;
  border-bottom: 2px solid #59328c;
  border-left: 2px solid #c2abe1;

  background: transparent;

  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
