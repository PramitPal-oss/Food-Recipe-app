/** @format */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import ErrorLoading from '../Error/ErrorLoading';
import Spinner from '../Error/Spinner';

function Veggie() {
  const [veggie, setveggie] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async function () {
    setIsLoading(true);
    setError(null);
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      setveggie(data.recipes);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {!isLoading && veggie.length > 0 && (
        <Wrapper>
          <h3>Our Vegetarian Picks</h3>
          <Splide
            options={{
              perPage: 3,
              arrows: false,
              pagination: false,
              drag: 'free',
              gap: '1rem',
              fixedWidth: '15rem',
              padding: '20px',
              breakpoints: {
                850: {
                  fixedWidth: '100%',
                  perPage: 1,
                  arrows: false,
                },
              },
            }}
          >
            {veggie.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <Card>
                    <Link to={'/recipe/' + recipe.id}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })}
          </Splide>
        </Wrapper>
      )}
      {!isLoading && veggie.length === 0 && !error && (
        <ErrorLoading error={'Sorry! No Recipes Found'} />
      )}
      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorLoading error={error} />}
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 18rem; /* 25rem */
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 1rem; /* 2rem (both) */
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
