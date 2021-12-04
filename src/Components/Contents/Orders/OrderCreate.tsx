import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { Account } from '../../../Types/account';
import { Io } from '../../../Types/io';

type Props = {
  token: string | null;
  fetchOrders: Function;
  toggleCreateOn: () => void;
};

const OrderCreate = (props: Props) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderType, setOrderType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [campaignStartDate, setCampaignStartDate] = useState('');
  const [orderAmount, setOrderAmount] = useState(0.0);
  const [spendAsOfDate, setSpendAsOfDate] = useState('');
  const [budgetSpent, setBudgetSpent] = useState(0.0);
  const [contractType, setContractType] = useState('');
  const [accountId, setAccountId] = useState('');
  const [ioId, setIoId] = useState('');
  const { id } = useParams<{ id?: string }>();
  const [accounts, setAccounts] = useState([]);
  const [ios, setIos] = useState([]);

  const fetchOrderData = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/order/create`, {
      method: 'Post',
      body: JSON.stringify({
        orderNumber: orderNumber,
        orderType: orderType,
        startDate: startDate,
        endDate: endDate,
        campaignStartDate: campaignStartDate,
        orderAmount: orderAmount,
        spendAsOfDate: spendAsOfDate,
        budgetSpent: budgetSpent,
        contractType: contractType,
        accountId: id,
        ioId: ioId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setOrderNumber('');
        setOrderType('');
        setStartDate('');
        setEndDate('');
        setCampaignStartDate('');
        setOrderAmount(0.0);
        setSpendAsOfDate('');
        setBudgetSpent(0.0);
        setContractType('');
        setAccountId('');
        setIoId('');
      })
      .then(() => {
        props.fetchOrders();
        props.toggleCreateOn();
      });
  };

  const OrderTypeArray = [
    'Acquisition',
    'Conversion',
    'Renewal',
    'Winback',
    'EJB',
  ];

  const ContractTypeArray = ['Contingent', 'Conversion', 'Pre-Paid'];

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

  const fetchIos = () => {
    fetch(`${APIURL}/io/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((io) => {
        setIos(io);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchAccounts();
    fetchIos();
  }, []);

  return (
    <StyledModal>
      <Title>
        <h1>Create Order</h1>
        <ModalClose
          onClick={() => {
            props.toggleCreateOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={fetchOrderData} id='orderCreate'>
        <div>
          <label htmlFor='orderNumber'>Order #:</label>
          <input
            name='orderNumber'
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='orderType'>Order Type:</label>
          <select onChange={(e) => setOrderType(e.target.value)}>
            <option value='default'></option>
            {OrderTypeArray.map((source, index) => (
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
          <label htmlFor='campaignStartDate'>Campaign Start Date:</label>
          <input
            name='campaignStartDate'
            type='date'
            value={campaignStartDate}
            onChange={(e) => setCampaignStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='spendAsOfDate'>Spend As Of Date:</label>
          <input
            name='spendAsOfDate'
            type='date'
            value={spendAsOfDate}
            onChange={(e) => setSpendAsOfDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='orderAmount'>Order Amount:</label>
          <input
            name='orderAmount'
            type='number'
            value={orderAmount}
            onChange={(e) => setOrderAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='budgetSpent'>Budget Spent:</label>
          <input
            name='budgetSpent'
            type='number'
            value={budgetSpent}
            onChange={(e) => setBudgetSpent(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='contractType'>Contract Type:</label>
          <select onChange={(e) => setContractType(e.target.value)}>
            <option value='default'></option>
            {ContractTypeArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
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
          <label htmlFor='ioId'>Io #:</label>
          <select onChange={(e) => setIoId(e.target.value)}>
            <option value='default'></option>
            {ios.map((io: Io, index) => (
              <option key={index} value={io.id}>
                {io.agencyIO}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button type='submit' form='orderCreate'>
        Add Order
      </button>
    </StyledModal>
  );
};

export default OrderCreate;
