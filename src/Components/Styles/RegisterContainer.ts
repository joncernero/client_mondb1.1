import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px 25px;
  border: 2px solid #59328c;
  border-radius: 10px;

  h1 {
    color: #59328c;
    align-self: flex-start;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
  }

  form {
    color: #283747;
    margin: 10px;
    display: flex;
    flex-direction: row;
  }

  label {
    align-self: flex-start;
    margin-bottom: 0.5em;
    color: #59328c;
    text-align: left;
    font-weight: bold;
  }

  input {
    align-self: flex-start;
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    margin-bottom: 1em;
  }

  select {
    align-self: flex-start;
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #283747;
    border-radius: 3px;
    margin-bottom: 1em;
  }

  button {
    align-self: flex-end;
    height: 35px;
    width: 100px;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    background: #59328c;
    border-radius: 5px;
    text-align: center;
    padding: 10px;

    &:hover {
      background: transparent;
      color: #59328c;
      border: 2px solid #59328c;
    }
  }
`;
