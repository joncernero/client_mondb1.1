import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import BudgetCreate from './BudgetCreate';
import BudgetEdit from './BudgetEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

type Budget = {
  id: string;
  year: string;
  month: string;
  startDate: string;
  endDate: string;
  spendAsOf: string;
  budgetAmount: number;
  spendAmount: number;
  credits: number;
  dailyPacing: number;
  actualPacing: number;
  rollOver: number;
  buPercentage: number;
  accountId: string;
  orderId: string;
};

type Props = {
  token: string;
  budgets: Budget[];
  fetchBudgets: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editBudget: Function;
};

const BudgetTable = (props: Props) => {
  const [editingBudget, setEditingBudget] = useState<Budget | undefined>();

  const DeleteBudget = (budget: Budget) => {
    console.log(budget.id);
    fetch(`${APIURL}/order/delete/${budget.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then(() => props.fetchBudgets())
      .catch((error) => console.log(error));
  };

  const FormatDate = (date: any) => {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
  };

  const BudgetMapper = () => {
    return props.budgets.length > 0
      ? props.budgets.map((budget: Budget, index) => {
          return (
            <tr key={index}>
              <td>{budget.year}</td>
              <td>{budget.month}</td>
              <td>{FormatDate(budget.startDate)}</td>
              <td>{FormatDate(budget.endDate)}</td>
              <td>{FormatDate(budget.spendAsOf)}</td>
              <td>{'$' + budget.budgetAmount}</td>
              <td>{'$' + budget.spendAmount}</td>
              <td>{'$' + budget.rollOver}</td>
              <td>{'$' + budget.dailyPacing}</td>
              <td>{'$' + budget.actualPacing}</td>
              <td>{budget.buPercentage + '%'}</td>
              <td>
                <FiIcons.FiEdit2
                  onClick={() => {
                    setEditingBudget(budget);
                    props.editBudget();
                    props.toggleEditOn();
                  }}
                />
              </td>
              <td>
                <FiIcons.FiTrash
                  onClick={() => {
                    DeleteBudget(budget);
                  }}
                />
              </td>
            </tr>
          );
        })
      : null;
  };

  return (
    <>
      {props.createActive ? (
        <BudgetCreate
          token={props.token}
          fetchBudgets={props.fetchBudgets}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <BudgetContainer>
        <Title>
          <h1>Budgets</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th scope='col'>Year:</th>
                <th scope='col'>Month:</th>
                <th scope='col'>Start Date:</th>
                <th scope='col'>End Date:</th>
                <th scope='col'>Spend As Of:</th>
                <th scope='col'>Budget Amount:</th>
                <th scope='col'>Spend Amount:</th>
                <th scope='col'>Roll Over:</th>
                <th scope='col'>Daily Pacing:</th>
                <th scope='col'>Actual Pacing:</th>
                <th scope='col'>BU%:</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>{BudgetMapper()}</tbody>
          </Table>
        </TableContainer>
      </BudgetContainer>
      {props.updateActive && editingBudget ? (
        <BudgetEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          budgetToUpdate={editingBudget}
          fetchBudgets={props.fetchBudgets}
          editBudget={props.editBudget}
        />
      ) : null}
    </>
  );
};

export default BudgetTable;

export const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled.div`
  display: flex;
  color: #59328c;
  justify-content: space-between;
  margin: 0 15px 15px 15px;
`;

export const TableContainer = styled.div`
  overflow: hidden;
  overflow-x: scroll;
`;

export const Table = styled.table`
  table-layout: fixed;
  /* width: 100%; */
  height: auto;
  padding: 5px 5px 10px 5px;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  overflow-x: scroll;

  thead {
    background: #59328c;
    width: auto;
  }

  th {
    color: #ffffff;
    padding: 5px 20px;
  }

  tbody tr {
    height: 15px;
    &:hover {
      background: #c2abe1;
      color: #ffffff;
    }
  }

  tbody tr:nth-child(even) {
    background: #f3f3f3;

    &:hover {
      background: #c2abe1;
    }
  }

  tbody td {
    text-align: center;
    padding: 5px 35px;
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
