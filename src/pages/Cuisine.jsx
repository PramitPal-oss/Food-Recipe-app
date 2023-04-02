/** @format */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import ErrorLoading from '../Error/ErrorLoading';
import Spinner from '../Error/Spinner';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [error, setError] = useState(null);
  const [isloading, setisLoading] = useState(false);

  let params = useParams();

  const getCuisine = async (name) => {
    setisLoading(true);
    setError(null);
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
      );
      const recipes = await data.json();
      setCuisine(recipes.results);
      setisLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setisLoading(false);

    // console.log(error);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isloading && cuisine.length > 0 && (
        <React.Fragment>
          {cuisine.map((recipe) => {
            return (
              <Card key={recipe.id}>
                <Link to={'/recipe/' + recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                  <h4>{recipe.title}</h4>
                </Link>
              </Card>
            );
          })}
        </React.Fragment>
      )}
      {!isloading && cuisine.length === 0 && !error && (
        <ErrorLoading error={'Sorry! No Recipes Found'} />
      )}
      {isloading && <Spinner />}
      {!isloading && error && <ErrorLoading error={error} />}
    </Grid>
  );
}

const Grid = styled(motion.div)`
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

export default Cuisine;
