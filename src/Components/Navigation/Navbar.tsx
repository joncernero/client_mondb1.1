import * as AiIcons from 'react-icons/ai';
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';

type Props = {
  sessionToken: string | null;
  clearToken: () => void;
  toggleNavBar: Function;
};

const Navbar = (props: Props) => {
  return (
    <>
      <NavContainer>
        <NavClose>
          <Link
            to='#'
            onClick={() => {
              props.toggleNavBar();
            }}>
            <AiIcons.AiOutlineClose />
          </Link>
        </NavClose>
        <NavPageLinks>
          {Sidebar.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <Span
                    onClick={() => {
                      props.toggleNavBar();
                    }}>
                    {item.title}
                  </Span>
                </Link>
              </li>
            );
          })}
        </NavPageLinks>
      </NavContainer>
    </>
  );
};
export default Navbar;

export const NavContainer = styled.div`
  position: fixed;
  background-color: #f3eef9;
  width: 25vw;
  height: 100vh;
  margin: -46px -15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #59328c;

  div {
    padding: 25px 5px 0 25px;
  }

  li {
    list-style-type: none;
    margin: 0 0 20px 0;
    font-size: 15px;
  }

  a {
    text-decoration: none;
    color: #59328c;
  }

  a:hover {
    color: #c2abe1;
  }
`;

export const NavClose = styled.div`
  display: flex;

  a {
    margin: 0 0 20px 0;
    font-size: 25px;
  }
`;

export const NavPageLinks = styled.div``;

export const NavIcons = styled.div`
  display: flex;
  flex-direction: row;

  a {
    margin: 15px 10px 0 0;
    font-size: 45px;
  }
`;

export const Span = styled.span`
  margin-left: 16px;
`;
