import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
// import { Account } from '../../../Types/account';
// import { Order } from '../../../Types/order';
import { Budget } from '../../../Types/budget';

type Props = {
  token: string | null;
  toggleEditOn: () => void;
  editBudget: Function;
  budgetToUpdate: Budget;
  fetchBudgets: Function;
};

const BudgetEdit = (props: Props) => {
  const [editYear, setEditYear] = useState(props.budgetToUpdate.year);
  const [editMonth, setEditMonth] = useState(props.budgetToUpdate.month);
  const [editStartDate, setEditStartDate] = useState(
    props.budgetToUpdate.startDate
  );
  const [editEndDate, setEditEndDate] = useState(props.budgetToUpdate.endDate);
  const [editSpendAsOf, setEditSpendAsOf] = useState(
    props.budgetToUpdate.spendAsOf
  );
  const [editBudgetAmount, setEditBudgetAmount] = useState(
    props.budgetToUpdate.budgetAmount
  );
  const [editSpendAmount, setEditSpendAmount] = useState(
    props.budgetToUpdate.spendAmount
  );
  const [editProjectedSpend, setEditProjectedSpend] = useState(
    props.budgetToUpdate.projectedSpend
  );
  const [editCredits, setEditCredits] = useState(props.budgetToUpdate.credits);

  const BudgetUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/budget/update/${props.budgetToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        year: editYear,
        month: editMonth,
        startDate: editStartDate,
        endDate: editEndDate,
        spendAsOf: editSpendAsOf,
        budgetAmount: editBudgetAmount,
        spendAmount: editSpendAmount,
        projectedSpend: editProjectedSpend,
        credits: editCredits,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchBudgets();
        props.toggleEditOn();
        props.editBudget();
      });
  };

  const YearArray = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
    '2031',
    '2032',
  ];

  const MonthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <StyledModal>
      <ModalClose
        onClick={() => {
          props.toggleEditOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={BudgetUpdate}>
        <h1>Edit Budget</h1>
        <div>
          <label htmlFor='editYear'>Year:</label>
          <select onChange={(e) => setEditYear(e.target.value)}>
            <option value='default'></option>
            {YearArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='editMonth'>Month:</label>
          <select onChange={(e) => setEditMonth(e.target.value)}>
            <option value='default'></option>
            {MonthArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='editStartDate'>Start Date:</label>
          <input
            name='editStartDate'
            type='date'
            value={editStartDate}
            onChange={(e) => setEditStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editEndDate'>End Date:</label>
          <input
            name='editEndDate'
            type='date'
            value={editEndDate}
            onChange={(e) => setEditEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editSpendAsOf'>Spend As Of:</label>
          <input
            name='editSpendAsOf'
            type='date'
            value={editSpendAsOf}
            onChange={(e) => setEditSpendAsOf(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editBudgetAmount'>Budget Amount:</label>
          <input
            name='editBudgetAmount'
            type='number'
            value={editBudgetAmount}
            onChange={(e) => setEditBudgetAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editSpendAmount'>Budget Spent:</label>
          <input
            name='editSpendAmount'
            type='number'
            value={editSpendAmount}
            onChange={(e) => setEditSpendAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editProjectedSpend'>Projected Spend:</label>
          <input
            name='editProjectedSpend'
            type='number'
            value={editProjectedSpend}
            onChange={(e) => setEditProjectedSpend(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editCredits'>Credits:</label>
          <input
            name='editCredits'
            type='number'
            value={editCredits}
            onChange={(e) => setEditCredits(Number(e.target.value))}
          />
        </div>
        <button type='submit'>Add Budget</button>
      </form>
    </StyledModal>
  );
};

export default BudgetEdit;
