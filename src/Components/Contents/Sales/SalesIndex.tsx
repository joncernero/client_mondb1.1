import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import SalesDisplay from './SalesDisplay';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Styles/Spinner';
import { Sales } from '../../../Types/sales';

type Props = {
  token: string | null;
};

function SalesIndex(props: Props) {
  const [sales, setSales] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [salesToUpdate, setSalesToUpdate] = useState({
    id: '',
    ppcSales: '',
    segment: '',
    industry: '',
    region: '',
    ats: '',
    salesChannel: '',
    primarySales: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchSales = () => {
    fetch(`${APIURL}/sales/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((sales) => {
        setSales(sales);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editSales = (sales: Sales) => {
    setSalesToUpdate(sales);
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
    fetchSales();
  }, []);

  return (
    <>
      {showLoading()}
      <>
        <SalesDisplay
          token={props.token || ''}
          sales={sales}
          fetchSales={fetchSales}
          editSales={editSales}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </>
    </>
  );
}

export default SalesIndex;
