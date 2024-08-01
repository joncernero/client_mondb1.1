import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import WeeklyIndex from '../Components/Contents/WeeklyUpdates/WeeklyIndex';
import styled from 'styled-components';
import ActivityIndex from '../Components/Contents/Activities/ActivityIndex';
import EngagementIndex from '../Components/Contents/Engagements/EngageIndex';
import OrdersIndex from '../Components/Contents/Orders/OrdersIndex';
import BudgetsIndex from '../Components/Contents/Budgets/BudgetsIndex';
import ProviderIndex from '../Components/Contents/ProviderInfo/ProviderIndex';
import ImplementIndex from '../Components/Contents/Implementation/ImplementIndex';
import CampaignIndex from '../Components/Contents/Campaigns/CampaignIndex';
import SalesIndex from '../Components/Contents/Sales/SalesIndex';

type Props = {
  token: string | null;
};

export default function SecondaryRouter(props: Props) {
  const { id } = useParams<{ id?: string }>();
  let { path, url } = useRouteMatch();
  return (
    <Router>
      <Container>
        <ul>
          <li>
            <Link to={`${url}/activity/${id}`}>Activities</Link>
          </li>
          <li>
            <Link to={`${url}/engagement/${id}`}>Engagements</Link>
          </li>
          <li>
            <Link to={`${url}/weeklyupdate/${id}`}>Weekly Updates</Link>
          </li>
          <li>
            <Link to={`${url}/order/${id}`}>Orders</Link>
          </li>
          <li>
            <Link to={`${url}/budget/${id}`}>Budgets</Link>
          </li>
          <li>
            <Link to={`${url}/provider/${id}`}>Provider</Link>
          </li>
          <li>
            <Link to={`${url}/implementation/${id}`}>Implementation</Link>
          </li>
          <li>
            <Link to={`${url}/Campaign/${id}`}>Campaign</Link>
          </li>
          <li>
            <Link to={`${url}/sales/${id}`}>Sales Info</Link>
          </li>
        </ul>

        <ContentContainer>
          <Switch>
            <Route exact path={`${path}/activity/:id`}>
              <ActivityIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/engagement/:id`}>
              <EngagementIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/weeklyupdate/:id`}>
              <WeeklyIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/order/:id`}>
              <OrdersIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/budget/:id`}>
              <BudgetsIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/provider/:id`}>
              <ProviderIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/implementation/:id`}>
              <ImplementIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/campaign/:id`}>
              <CampaignIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/sales/:id`}>
              <SalesIndex token={props.token} />
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
  overflow: scroll;
`;
