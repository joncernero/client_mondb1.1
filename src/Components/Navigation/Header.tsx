import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from './Navbar';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

type Props = {
  sessionToken: string | null;
  clearToken: () => void;
};

const Header = (props: Props) => {
  const [navBarActive, setNavBarActive] = useState(false);
  const history = useHistory();

  const toggleNavBar = () => {
    setNavBarActive(!navBarActive);
  };

  return (
    <Container>
      <NavIcon>
        <div>
          <FaIcons.FaBars onClick={() => toggleNavBar()} />
          {navBarActive ? (
            <NavBar
              toggleNavBar={toggleNavBar}
              sessionToken={props.sessionToken}
              clearToken={props.clearToken}
            />
          ) : null}
        </div>
        <AppTitle>
          <Link to='/dashboard'>
            <h1>AccountHub</h1>
          </Link>
        </AppTitle>
      </NavIcon>
      {localStorage.getItem('token') ? (
        <LogButton
          onClick={() => {
            props.clearToken();
            history.push('/');
          }}>
          Logout
        </LogButton>
      ) : (
        <LogButton>
          <Link to='/login'>Login</Link>
        </LogButton>
      )}
    </Container>
  );
};

export default Header;

export const Container = styled.div`
  display: flex;
  padding-top: 15px;
  justify-content: space-between;
  height: 10vh;
  width: 100%;
  background-color: #ffffff;
`;

export const NavIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-left: 15px;
  font-size: 25px;
  color: #59328c;
  div:hover:nth-child(1) {
    color: #c2abe1;
  }
`;

export const AppTitle = styled.div`
  padding-left: 15px;
  h1 {
    font-size: 20px;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    color: #c2abe1;
  }
`;

export const LogButton = styled.button`
  height: 35px;
  width: 100px;
  color: #59328c;
  font-size: 15px;
  background: transparent;
  border: 2px solid #59328c;
  border-radius: 5px;
  margin-right: 15px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    background: #c2abe1;
    border: 2px solid #c2abe1;
    color: #ffffff;
  }
`;

// export const Image = styled.img.attrs({
//   src: `${#}`,
// })`
//   width: 100px;
//   height: 25px;
//   padding: 5px;
//   margin: 0 0 0 10px;
// `;
