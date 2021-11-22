import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import OrderTable from './OrderTable';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from '../../Styles/Spinner';

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
};

function OrdersIndex(props: Props) {
  const [order, setOrder] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [orderToUpdate, setOrderToUpdate] = useState({
    id: '',
    orderNumber: '',
    orderType: '',
    startDate: '',
    endDate: '',
    campaignStartDate: '',
    spendAsOfDate: '',
    orderAmount: 0.0,
    budgetSpent: 0.0,
    contractType: '',
    dailyPacing: 0.0,
    cbu: 0.0,
    accountId: '',
    ioId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

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
        setOrder(order);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editOrder = (order: Order) => {
    setOrderToUpdate(order);
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  const toggleCreateOn = () => {
    setCreateActive(!createActive);
  };

  const showLoading = () => {
    if (isLoading) {
      return <Spinner />;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {showLoading()}
      <Container>
        <OrderTable
          token={props.token || ''}
          orders={order}
          fetchOrders={fetchOrders}
          editOrder={editOrder}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </Container>
    </>
  );
}

export default OrdersIndex;

export const Container = styled.div`
  height: 250px;
  width: 100%;
`;
