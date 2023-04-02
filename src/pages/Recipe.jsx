/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ErrorLoading from '../Error/ErrorLoading';
import Spinner from '../Error/Spinner';
import { useCallback } from 'react';

//https://spoonacular.com/cdn/ingredients_100x100/bell-pepper-orange.png

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState('');
  const [activeTab, setActiveTab] = useState('instructions');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/`;

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=e019cfad22364f38aa87e26eedd56556`
      );
      const datadetails = await data.json();
      console.log(datadetails.extendedIngredients);
      setDetails(datadetails);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [params.name]);

  useEffect(() => {
    fetchDetails();
  }, [params.name, fetchDetails]);

  return (
    <DetailWrapper>
      {!isLoading && (
        <React.Fragment>
          <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title} />
          </div>
          <Info>
            <Button
              onClick={(e) => setActiveTab('instructions')}
              className={activeTab === `instructions` ? 'active' : ''}
            >
              Instructions
            </Button>
            <Button
              onClick={(e) => setActiveTab('ingredients')}
              className={activeTab === `ingredients` ? 'active' : ''}
            >
              Ingredients
            </Button>
            <Button
              onClick={(e) => setActiveTab('summary')}
              className={activeTab === `summary` ? 'active' : ''}
            >
              Summary
            </Button>
            {activeTab === 'instructions' && (
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <Ul>
                {details.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>
                    <img src={`${imageUrl}${ingredient.image}`} alt='' />
                    <p>{ingredient.original}</p>
                  </li>
                ))}
              </Ul>
            )}
            {activeTab === 'summary' && (
              <ul>
                <li
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                ></li>
              </ul>
            )}
          </Info>
        </React.Fragment>
      )}
      {!isLoading && details.length === 0 && !error && (
        <ErrorLoading error={'Sorry! No Recipes Found'} />
      )}
      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorLoading error={error} />}
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  margin-top: 1rem;
  text-align: center;

  .active {
    background: linear-gradient(35deg, #494949, #5f5c5c);
    color: white;
  }
  img {
    border-radius: 1rem;
    text-align: center;
    @media (max-width: 56.25em) {
      width: 75%;
    }
  }
  h2 {
    margin-bottom: 2rem;
  }

  h3 {
    margin-top: 1rem;
    text-align: justify;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 1px;
    /* background-color: #ebe5e5;*/
    border-radius: 0.5rem;
    color: black;
    width: 100%;
    @media (max-width: 56.25em) {
      width: 100%;
      text-align: center;
    }
  }

  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: justify;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
    list-style: none;
    background-color: #ebe5e5;

    li {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
  }
`;

const Ul = styled.ul`
  margin-bottom: 4rem;

  li {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 2px solid black;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;

    img {
      display: inline-block;
      align-self: center;
      justify-self: center;
      @media (max-width: 56.25em) {
        width: 67px;
        height: 100px;
      }
    }
    p {
      justify-self: center;
      align-self: center;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  margin-right: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Recipe;
