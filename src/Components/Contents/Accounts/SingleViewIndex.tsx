import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import SingleAccountDisplay from './SingleAccountDisplay';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';

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
};

const SingleViewIndex = (props: Props) => {
  const [account, setAccount] = useState([]);
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [accountToUpdate, setAccountToUpdate] = useState({
    id: '',
    accountName: '',
    accountID: '',
    customerNumber: 0,
    accountType: '',
    assignmentDate: '',
    primaryXCode: '',
    userId: '',
    agencyId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSingleAccount = () => {
    fetch(`${APIURL}/account/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((account) => {
        setAccount(account);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editAccount = (account: Account) => {
    setAccountToUpdate(account);
  };

  const toggleEditOn = () => {
    setUpdateActive(!updateActive);
  };

  const showLoading = () => {
    if (isLoading) {
      return <Spinner />;
    }
  };

  useEffect(() => {
    fetchSingleAccount();
    fetchUsers();
    fetchAgencies();
  }, []);

  const fetchUsers = () => {
    fetch(`${APIURL}/user`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/Json',
        Authorization: `${localStorage.getItem('token')}/`,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        setUsers(user);
      })
      .catch((error) => console.log(error));
  };

  const fetchAgencies = () => {
    fetch(`${APIURL}/agency/`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((agency) => {
        setAgencies(agency);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {showLoading()}
      <>
        <SingleAccountDisplay
          token={props.token}
          users={users}
          account={account}
          agencies={agencies}
          fetchSingleAccount={fetchSingleAccount}
          editAccount={editAccount}
          toggleEditOn={toggleEditOn}
          updateActive={updateActive}
          accountToUpdate={accountToUpdate}
        />
      </>
    </>
  );
};

export default SingleViewIndex;
