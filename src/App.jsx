import React from 'react';
import Pages from './pages/Pages';
import Catageory from './components/Catageory';
import { BrowserRouter, Link } from 'react-router-dom';
import Search from './components/Search';
import styled from 'styled-components';
import { GiKnifeFork } from 'react-icons/gi';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={'/'}>Delicious </Logo>
        </Nav>
        <Search />
        <Catageory />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`;
const Nav = styled.div`
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

export default App;
