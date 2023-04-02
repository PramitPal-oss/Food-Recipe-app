/** @format */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ErrorLoading from '../Error/ErrorLoading';
import Spinner from '../Error/Spinner';

function Searched() {
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  const getSearched = async (name) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
      );
      const recipes = await data.json();
      setSearchRecipes(recipes.results);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {!isLoading && searchRecipes.length > 0 && (
        <React.Fragment>
          {searchRecipes.map((el) => {
            return (
              <Card key={el.id}>
                <Link to={'/recipe/' + el.id}>
                  <img src={el.image} alt={el.title} />
                  <h4>{el.title}</h4>
                </Link>
              </Card>
            );
          })}
        </React.Fragment>
      )}
      {!isLoading && searchRecipes.length === 0 && !error && (
        <ErrorLoading error={'Sorry! No Recipes Found'} />
      )}
      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorLoading error={error} />}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
