import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import OrderCreate from './OrderCreate';
import OrderEdit from './OrderEdit';
import styled from 'styled-components';
import * as FiIcons from 'react-icons/fi';

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
  token: string;
  orders: Order[];
  fetchOrders: Function;
  createActive: boolean;
  updateActive: boolean;
  toggleCreateOn: () => void;
  toggleEditOn: () => void;
  editOrder: Function;
};

const OrderTable = (props: Props) => {
  const [editingOrder, setEditingOrder] = useState<Order | undefined>();
  const [accounts, setAccounts] = useState([]);
  const [ios, setIos] = useState([]);

  const DeleteOrder = (order: Order) => {
    console.log(order.id);
    fetch(`${APIURL}/order/delete/${order.id}`, {
      method: 'Delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then(() => props.fetchOrders())
      .catch((error) => console.log(error));
  };

  const FormatDate = (date: any) => {
    const dateObj = new Date(date + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US').format(dateObj);
  };

  const OrderMapper = () => {
    return props.orders.length > 0
      ? props.orders.map((order: Order, index) => {
          return (
            <tr key={index}>
              <td>{order.orderNumber}</td>
              <td>{order.orderType}</td>
              <td>{order.contractType}</td>
              <td>{FormatDate(order.startDate)}</td>
              <td>{FormatDate(order.endDate)}</td>
              <td>{FormatDate(order.campaignStartDate)}</td>
              <td>{'$' + order.orderAmount}</td>
              <td>{FormatDate(order.spendAsOfDate)}</td>
              <td>{'$' + order.budgetSpent}</td>
              <td>{'$' + order.dailyPacing}</td>
              <td>{order.cbu + '%'}</td>
              <td>
                <FiIcons.FiEdit2
                  onClick={() => {
                    setEditingOrder(order);
                    props.editOrder();
                    props.toggleEditOn();
                  }}
                />
              </td>
              <td>
                <FiIcons.FiTrash
                  onClick={() => {
                    DeleteOrder(order);
                  }}
                />
              </td>
            </tr>
          );
        })
      : null;
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
    <>
      {props.createActive ? (
        <OrderCreate
          token={props.token}
          fetchOrders={props.fetchOrders}
          toggleCreateOn={props.toggleCreateOn}
        />
      ) : null}
      <OrderContainer>
        <Title>
          <h1>Orders</h1>
          <FiIcons.FiPlusSquare onClick={() => props.toggleCreateOn()} />
        </Title>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th scope='col'>Order #:</th>
                <th scope='col'>Order Type:</th>
                <th scope='col'>Contract Type:</th>
                <th scope='col'>Start Date:</th>
                <th scope='col'>End Date:</th>
                <th scope='col'>Launch Date:</th>
                <th scope='col'>Order Amount:</th>
                <th scope='col'>Spend As Of:</th>
                <th scope='col'>Budget Spent:</th>
                <th scope='col'>Daily Pacing:</th>
                <th scope='col'>CBU%:</th>
                <th scope='col'></th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>{OrderMapper()}</tbody>
          </Table>
        </TableContainer>
      </OrderContainer>
      {props.updateActive && editingOrder ? (
        <OrderEdit
          token={props.token}
          toggleEditOn={props.toggleEditOn}
          orderToUpdate={editingOrder}
          fetchOrders={props.fetchOrders}
          editOrder={props.editOrder}
          accounts={accounts}
          ios={ios}
        />
      ) : null}
    </>
  );
};

export default OrderTable;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  color: #59328c;
  justify-content: space-between;
  margin: 0 15px 15px 15px;
`;

export const TableContainer = styled.div`
  overflow: scroll;
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 200%;
  /* height: 200px; */
  padding: 5px 5px 10px 5px;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background: #59328c;
    width: auto;
  }

  th {
    color: #ffffff;
    padding: 10px;
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
    padding: 5px 5px;
    /* width: 150px; */
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
