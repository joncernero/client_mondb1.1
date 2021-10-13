import styled from 'styled-components';

export const StyledModal = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: absolute;
  margin: 0 auto;
  z-index: 75;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 15px black;
  border: 3px solid #59328c;
  border-radius: 10px;

  h1 {
    text-align: center;
    margin: 25px 0;
    color: #59328c;
  }

  form {
    color: #283747;
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 10px auto;
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
    align-self: center;

    &:hover {
      background: transparent;
      border: 2px solid #59328c;
      color: #060b26;
    }
  }
`;

export const ModalClose = styled.div`
  align-self: flex-end;
  font-size: 25px;
  color: #59328c;
  border: 2px solid #59328c;

  &:hover {
    color: #c2abe1;
    border: 2px solid #c2abe1;
  }
`;
