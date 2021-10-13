import styled from 'styled-components';

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  padding: 25px 25px;
  border: 2px solid #59328c;
  border-radius: 10px;
  margin-bottom: 10px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background: #59328c;
    width: 100%;
  }

  thead th:nth-child(1) {
    text-align: left;
    width: 30%;
  }

  thead th:nth-child(2) {
    width: 35%;
  }

  thead th:nth-child(3) {
    width: 10%;
  }

  tbody tr {
    &:hover {
      background: #c2abe1;
      color: #ffffff;
      font-weight: bold;
    }
  }

  tbody tr:nth-child(even) {
    background: #f3f3f3;

    &:hover {
      background: #c2abe1;
    }
  }

  th {
    color: #ffffff;
    padding: 15px;
  }

  tbody td {
  }

  td {
    padding: 15px;
    width: auto;
  }

  td:not(:first-child) {
    text-align: center;
  }

  button {
    padding: 5px 15px;
    border-radius: 5px;

    &:hover {
      background: #59328c;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;
