import React from 'react';
import svg from '../assets/icons.svg';
import classes from './ErrorLoading.module.css';

function ErrorLoading(props) {
  return (
    <div className={classes.error}>
      <div>
        <svg>
          <use xlinkHref={`${svg}#icon-alert-triangle`}></use>
        </svg>
      </div>
      <p>{props.error}</p>
    </div>
  );
}

export default ErrorLoading;
