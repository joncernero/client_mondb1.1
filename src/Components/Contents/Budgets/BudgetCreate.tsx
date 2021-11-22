import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';

type Account = {
  id: string;
  accountName: string;
  accountID: string;
  customerNumber: number;
  accountType: string;
  assignmentDate: string;
  primaryXCode: string;
  userId: string;
  agencyId: string;
};

type Order = {
  id: string;
  orderNumber: string;
  orderType: string;
  startDate: string;
  endDate: string;
  campaignStartDate: string;
  spendAsOfDate: string;
  orderAmount: number;
  budgetSpent: number;
  contractType: string;
  dailyPacing: number;
  cbu: number;
  accountId: string;
  ioId: string;
};

type Props = {
  token: string | null;
  fetchBudgets: Function;
  toggleCreateOn: () => void;
};

const BudgetCreate = (props: Props) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [spendAsOf, setSpendAsOf] = useState('');
  const [budgetAmount, setBudgetAmount] = useState(0.0);
  const [spendAmount, setSpendAmount] = useState(0.0);
  const [projectedSpend, setProjectedSpend] = useState(0.0);
  const [credits, setCredits] = useState(0.0);
  const [accountId, setAccountId] = useState('');
  const [orderId, setOrderId] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [accounts, setAccounts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchBudgetData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/budget/create`, {
      method: 'Post',
      body: JSON.stringify({
        year: year,
        month: month,
        startDate: startDate,
        endDate: endDate,
        spendAsOf: spendAsOf,
        budgetAmount: budgetAmount,
        spendAmount: spendAmount,
        projectedSpend: projectedSpend,
        credits: credits,
        accountId: id,
        orderId: orderId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setYear('');
        setMonth('');
        setStartDate('');
        setEndDate('');
        setSpendAsOf('');
        setBudgetAmount(0.0);
        setSpendAmount(0.0);
        setProjectedSpend(0.0);
        setCredits(0.0);
        setAccountId('');
        setOrderId('');
      })
      .then(() => {
        props.fetchBudgets();
        props.toggleCreateOn();
      });
  };

  const fetchAccounts = () => {
    fetch(`${APIURL}/account/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((account) => {
        setAccounts(account);
      })
      .catch((error) => console.log(error));
  };

  const fetchOrders = () => {
    fetch(`${APIURL}/order/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((order) => {
        setOrders(order);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAccounts();
    fetchOrders();
  }, []);

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
          props.toggleCreateOn();
        }}>
        <AiIcons.AiOutlineClose />
      </ModalClose>
      <form onSubmit={fetchBudgetData}>
        <h1>Create Budget</h1>
        <div>
          <label htmlFor='year'>Year:</label>
          <select onChange={(e) => setYear(e.target.value)}>
            <option value='default'></option>
            {YearArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='month'>Month:</label>
          <select onChange={(e) => setMonth(e.target.value)}>
            <option value='default'></option>
            {MonthArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='startDate'>Start Date:</label>
          <input
            name='startDate'
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='endDate'>End Date:</label>
          <input
            name='endDate'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='spendAsOf'>Spend As Of:</label>
          <input
            name='spendAsOf'
            type='date'
            value={spendAsOf}
            onChange={(e) => setSpendAsOf(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='budgetAmount'>Budget Amount:</label>
          <input
            name='budgetAmount'
            type='number'
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='spendAmount'>Budget Spent:</label>
          <input
            name='spendAmount'
            type='number'
            value={spendAmount}
            onChange={(e) => setSpendAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='projectedSpend'>Projected Spend:</label>
          <input
            name='projectedSpend'
            type='number'
            value={projectedSpend}
            onChange={(e) => setProjectedSpend(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='credits'>Credits:</label>
          <input
            name='credits'
            type='number'
            value={credits}
            onChange={(e) => setCredits(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='accountId'>Account Name:</label>
          <select onChange={(e) => setAccountId(e.target.value)}>
            <option value='default'></option>
            {accounts.map((account: Account, index) => (
              <option key={index} value={account.id}>
                {account.accountName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='orderId'>Order #:</label>
          <select onChange={(e) => setOrderId(e.target.value)}>
            <option value='default'></option>
            {orders.map((order: Order, index) => (
              <option key={index} value={order.id}>
                {order.orderNumber}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Add Budget</button>
      </form>
    </StyledModal>
  );
};

export default BudgetCreate;
