import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';

const AgencyIndex = () => {
  const [agencies, setAgencies] = useState([]);

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
      });
  };

  useEffect(() => {
    fetchAgencies();
  }, []);
};

export default AgencyIndex;
