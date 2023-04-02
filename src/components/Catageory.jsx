/** @format */

import { FaPizzaSlice, FaHamburger, FaHome } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Catageory() {
  return (
    <List>
      <Slink to={`/`}>
        <FaHome />
        <h4>Home</h4>
      </Slink>
      <Slink to={`/cuisine/Italian`}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </Slink>
      <Slink to={`/cuisine/American`}>
        <FaHamburger />
        <h4>American</h4>
      </Slink>
      <Slink to={`/cuisine/Thai`}>
        <GiNoodles />
        <h4>Thai</h4>
      </Slink>
      <Slink to={`/cuisine/Japanese`}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </Slink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  @media (max-width: 25em) {
    width: 100%;
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
    grid-gap: 0;
    justify-content: center;
    margin: 1rem 0;
    align-items: center; */
  }
`;

const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 2rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  @media (max-width: 25em) {
    width: 6rem;
    height: 6rem;
  }

  @media (max-width: 68.75em) {
    /*width: 100%;
    height: 100%; */
    margin-right: 0.5rem;
    align-self: center;
    justify-self: center;
  }

  h4 {
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
    }

    h4 {
      color: white;
    }
  }
`;

export default Catageory;
