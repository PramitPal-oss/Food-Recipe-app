/** @format */

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.length === 0) return;
    navigate('/searched/' + input);
    setInput('');
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 75%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 14%;
    font-size: 1.5rem;
    transform: translate(100%, -50%);
    color: white;
    transform: translate(-50%, -50%);

    @media (max-width: 48em) {
      left: 15%;
    }
    @media (max-width: 25em) {
      left: 16%;
    }
  }
`;

export default Search;
