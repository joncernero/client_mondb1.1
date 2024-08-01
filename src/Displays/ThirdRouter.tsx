import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import OrdersIndex from '../Components/Contents/Orders/OrdersIndex';
import BudgetsIndex from '../Components/Contents/Budgets/BudgetsIndex';
import styled from 'styled-components';

type Props = {
  token: string | null;
};

export default function SecondaryRouter(props: Props) {
  const { id } = useParams<{ id?: string }>();
  const { path, url } = useRouteMatch();
  return (
    <Router>
      <Container>
        <ul>
          <li>
            <Link to={`${url}/order/${id}`}>Orders</Link>
          </li>
          <li>
            <Link to={`${url}/budget/${id}`}>Budgets</Link>
          </li>
        </ul>

        <ContentContainer>
          <Switch>
            <Route exact path={`${path}/order/:id`}>
              <OrdersIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/budget/:id`}>
              <BudgetsIndex token={props.token} />
            </Route>
          </Switch>
        </ContentContainer>
      </Container>
    </Router>
  );
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  /* overflow: hidden; */

  ul {
    display: flex;
    list-style: none;
    background: #59328c;
    color: #ffffff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    margin: 0 0 0 0;
  }

  li {
    padding: 15px;

    &:hover {
      background: #c2abe1;
    }
  }

  li:nth-child(1) {
    margin: 0 0 0 0;

    &:hover {
      border-top-left-radius: 10px;
    }
  }

  li:not(:first-child) {
    margin: 0 0 0 0;
  }

  li a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bolder;

    &:hover {
      color: #ffffff;
    }
  }
`;

export const ContentContainer = styled.div`
  border: 3px solid #59328c;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 25px;
  height: 330px;
  overflow: scroll;
  margin-top: 15px;
`;
