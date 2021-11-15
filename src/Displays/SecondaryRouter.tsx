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

type Props = {
  token: string | null;
};

export default function SecondaryRouter(props: Props) {
  const { id } = useParams<{ id?: string }>();
  let { path, url } = useRouteMatch();
  console.log(id);
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
              <WeeklyIndex />
            </Route>
          </Switch>
        </ContentContainer>
      </Container>
    </Router>
  );
}

export const Container = styled.div`
  width: 100%;
  margin-bottom: 15px;

  ul {
    display: flex;
    list-style: none;
    background: #59328c;
    color: #ffffff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
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
  height: 250px;
`;
