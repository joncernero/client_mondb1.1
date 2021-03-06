import React, { useState, useEffect } from 'react';
import APIURL from '../../../Utilities/Environments';
import BudgetTable from './BudgetTable';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from '../../Styles/Spinner';
import { Budget } from '../../../Types/budget';

type Props = {
  token: string | null;
};

function BudgetsIndex(props: Props) {
  const [budget, setBudget] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const [budgetToUpdate, setBudgetToUpdate] = useState({
    id: '',
    year: '',
    month: '',
    startDate: '',
    endDate: '',
    spendAsOf: '',
    budgetAmount: 0.0,
    spendAmount: 0.0,
    projectedSpend: 0.0,
    credits: 0.0,
    dailyPacing: 0.0,
    actualPacing: 0.0,
    rollOver: 0.0,
    buPercentage: 0.0,
    accountId: '',
    orderId: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBudgets = () => {
    fetch(`${APIURL}/budget/${id}`, {
      method: 'Get',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((res) => res.json())
      .then((budget) => {
        setBudget(budget);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editBudget = (budget: Budget) => {
    setBudgetToUpdate(budget);
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
    fetchBudgets();
  }, []);
  return (
    <>
      {showLoading()}
      <Container>
        <BudgetTable
          token={props.token || ''}
          budgets={budget}
          fetchBudgets={fetchBudgets}
          editBudget={editBudget}
          toggleCreateOn={toggleCreateOn}
          toggleEditOn={toggleEditOn}
          createActive={createActive}
          updateActive={updateActive}
        />
      </Container>
    </>
  );
}

export default BudgetsIndex;

export const Container = styled.div`
  height: 220px;
  width: 100%;
`;
