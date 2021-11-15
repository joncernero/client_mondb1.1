import styled from 'styled-components';

export const StyledModal = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  position: absolute;
  z-index: 75;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 15px black;
  border: 3px solid #59328c;
  border-radius: 10px;
  overflow-y: scroll;

  form {
    color: #283747;
    display: flex;
    flex-wrap: wrap;
  }

  div {
    margin: 10px;
  }
  label {
    margin-bottom: 0.5em;
    color: #283747;
    display: block;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  select {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  button {
    align-self: flex-end;
    height: 35px;
    width: 150px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    background: #59328c;
    border-radius: 5px;
    margin: 15px 0 0 0;
    padding: 5px;
    box-shadow: 1px 3px 7px gray;

    &:hover {
      background: transparent;
      border: 2px solid #59328c;
      color: #060b26;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h1 {
    color: #59328c;
    font-size: 25px;
  }
`;

export const ModalClose = styled.div`
  font-size: 15px;
  color: #59328c;
  border: 2px solid #59328c;
  text-align: center;

  &:hover {
    color: #c2abe1;
    border: 2px solid #c2abe1;
  }
`;
