import React, { useState } from 'react';
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

type Props = {
  token: string | null;
  fetchOrders: Function;
  toggleCreateOn: Function;
  accounts: Account[];
};

const OrderCreate = (props: Props) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderType, setOrderType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [campaignStartDate, setCampaignStartDate] = useState('');
  const [amount, setAmount] = useState(0);
  const [spendAsOf, setSpendAsOf] = useState('');
  const [ytdSpend, setYtdSpend] = useState(0);
  const [dailyPacing, setDailyPacing] = useState(0);
  const [cbu, setCbu] = useState(0);
  const [contractType, setContractType] = useState('');
  const [accountId, setAccountId] = useState('');
  const [ioId, setIoId] = useState('');
  const { id } = useParams<{ id?: string }>();

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
        amount: amount,
        spendAsOf: spendAsOf,
        ytdSpend: ytdSpend,
        dailyPacing: dailyPacing,
        cbu: cbu,
        contractType: contractType,
        accountId: accountId,
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
        setAmount(0);
        setSpendAsOf('');
        setYtdSpend(0);
        setDailyPacing(0);
        setCbu(0);
        setContractType('');
        setAccountId('');
        setIoId('');
      })
      .then(() => {
        props.fetchOrders();
        props.toggleCreateOn(true);
      });
  };
};
