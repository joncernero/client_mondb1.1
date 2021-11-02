import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import ProviderIndex from '../Components/Contents/ProviderInfo/ProviderIndex';
import ImplementIndex from '../Components/Contents/Implementation/ImplementIndex';
import CampaignIndex from '../Components/Contents/Campaigns/CampaignIndex';
import styled from 'styled-components';

type Props = {
  token: string | null;
};

export default function SecondaryRouter(props: Props) {
  const { id } = useParams<{ id?: string }>();
  const { path, url } = useRouteMatch();
  console.log(id);
  return (
    <Router>
      <Container>
        <ul>
          <li>
            <Link to={`${url}/provider/${id}`}>Provider</Link>
          </li>
          <li>
            <Link to={`${url}/implementation/${id}`}>Implementation</Link>
          </li>
          <li>
            <Link to={`${url}/Campaign/${id}`}>Campaign</Link>
          </li>
        </ul>

        <ContentContainer>
          <Switch>
            <Route exact path={`${path}/provider/:id`}>
              <ProviderIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/implementation/:id`}>
              <ImplementIndex token={props.token} />
            </Route>
            <Route exact path={`${path}/campaign/:id`}>
              <CampaignIndex token={props.token} />
            </Route>
          </Switch>
        </ContentContainer>
      </Container>
    </Router>
  );
}

export const Container = styled.div`
  width: 100%;

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
