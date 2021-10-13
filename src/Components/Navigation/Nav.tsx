import React from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import Monster from '../../Assets/header-m.png';

type Props = {
  toggleNavBar: Function;
};

const Navigation = (props: Props) => {
  return (
    <>
      <ContainerOne>
        <FaIcons.FaBars onClick={() => props.toggleNavBar()} />
        <MonsterImage />
      </ContainerOne>
    </>
  );
};

export default Navigation;

export const ContainerOne = styled.div`
  color: #59328c;
  font-size: 25px;
  margin: 0 0 0 5px;
  width: 50px;
  height: 50px;
  display: flex;
  padding: 5px;
`;

export const MonsterImage = styled.img.attrs({
  src: `${Monster}`,
})`
  width: 100px;
  height: 25px;
  padding: 5px;
  margin: 0 0 0 60px;
`;
