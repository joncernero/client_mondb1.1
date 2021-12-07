import React, { useState } from 'react';
import APIURL from '../../../Utilities/Environments';
import { StyledModal, ModalClose, Title } from '../../Styles/Modal';
import * as AiIcons from 'react-icons/ai';
import { Order } from '../../../Types/order';
import { Account } from '../../../Types/account';
import { Io } from '../../../Types/io';

type Props = {
  token: string | null;
  toggleEditOn: () => void;
  editOrder: Function;
  orderToUpdate: Order;
  accounts: Account[];
  ios: Io[];
  fetchOrders: Function;
};

const OrderEdit = (props: Props) => {
  const [editOrderNumber, setEditOrderNumber] = useState(
    props.orderToUpdate.orderNumber
  );
  const [editOrderType, setEditOrderType] = useState(
    props.orderToUpdate.orderType
  );
  const [editStartDate, setEditStartDate] = useState(
    props.orderToUpdate.startDate
  );
  const [editEndDate, setEditEndDate] = useState(props.orderToUpdate.endDate);
  const [editCampaignStartDate, setEditCampaignStartDate] = useState(
    props.orderToUpdate.campaignStartDate
  );
  const [editOrderAmount, setEditOrderAmount] = useState(
    props.orderToUpdate.orderAmount
  );
  const [editSpendAsOfDate, setEditSpendAsOfDate] = useState(
    props.orderToUpdate.spendAsOfDate
  );
  const [editBudgetSpent, setEditBudgetSpent] = useState(
    props.orderToUpdate.budgetSpent
  );
  const [editContractType, setEditContractType] = useState(
    props.orderToUpdate.contractType
  );
  const [editAccountId, setEditAccountId] = useState<string | undefined>(
    props.orderToUpdate.accountId
  );
  const [editIoId, setEditIoId] = useState<string | undefined>(
    props.orderToUpdate.ioId
  );

  const OrderUpdate = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch(`${APIURL}/order/update/${props.orderToUpdate.id}`, {
      method: 'Put',
      body: JSON.stringify({
        orderNumber: editOrderNumber,
        orderType: editOrderType,
        startDate: editStartDate,
        endDate: editEndDate,
        campaignStartDate: editCampaignStartDate,
        orderAmount: editOrderAmount,
        spendAsOfDate: editSpendAsOfDate,
        budgetSpent: editBudgetSpent,
        contractType: editContractType,
        accountId: editAccountId,
        ioId: editIoId,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        props.fetchOrders();
        props.toggleEditOn();
        props.editOrder();
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

  return (
    <StyledModal>
      <Title>
        <h1>Update Order</h1>
        <ModalClose
          onClick={() => {
            props.toggleEditOn();
          }}>
          <AiIcons.AiOutlineClose />
        </ModalClose>
      </Title>
      <form onSubmit={OrderUpdate} id='orderEdit'>
        <div>
          <label htmlFor='editOrderNumber'>Order #:</label>
          <input
            name='editOrderNumber'
            value={editOrderNumber}
            onChange={(e) => setEditOrderNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editOrderType'>Order Type:</label>
          <select onChange={(e) => setEditOrderType(e.target.value)}>
            <option value='default'></option>
            {OrderTypeArray.map((source, index) => (
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
          <label htmlFor='editCampaignStartDate'>Campaign Start Date:</label>
          <input
            name='editCampaignStartDate'
            type='date'
            value={editCampaignStartDate}
            onChange={(e) => setEditEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editSpendAsOfDate'>Spend As Of Date:</label>
          <input
            name='editSpendAsOfDate'
            type='date'
            value={editSpendAsOfDate}
            onChange={(e) => setEditSpendAsOfDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='editOrderAmount'>Order Amount:</label>
          <input
            name='editOrderAmount'
            type='number'
            value={editOrderAmount}
            onChange={(e) => setEditOrderAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editBudgetSpent'>Budget Spent:</label>
          <input
            name='editBudgetSpent'
            type='number'
            value={editBudgetSpent}
            onChange={(e) => setEditBudgetSpent(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor='editContractType'>Contract Type:</label>
          <select onChange={(e) => setEditContractType(e.target.value)}>
            <option value='default'></option>
            {ContractTypeArray.map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button type='submit' form='orderEdit'>
        Add Order
      </button>
    </StyledModal>
  );
};

export default OrderEdit;
