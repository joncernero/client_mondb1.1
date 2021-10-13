import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65vh;

  h1 {
    color: #59328c;
  }

  form {
    color: #59328c;
    display: block;
    width: 300px;
    margin: 10px auto;
  }

  label {
    margin-bottom: 0.5em;
    color: #59328c;
    display: block;
    text-align: left;
    font-weight: bold;
  }

  input {
    padding: 0.5em;
    color: #283747;
    background: #eaecee;
    border: 1px solid #59328c;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 1em;
  }

  button {
    height: 35px;
    width: 150px;
    color: #59328c;
    font-size: 15px;
    font-weight: bold;
    border: 2px solid #59328c;
    background: transparent;
    border-radius: 5px;
    margin: 15px;
    text-align: center;

    &:hover {
      background: #c2abe1;
      color: #ffffff;
      border: 2px solid #c2abe1;
    }
  }
  div {
    text-align: center;
  }
`;
