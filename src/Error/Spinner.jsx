/** @format */

import React from 'react';
import svg from '../assets/icons.svg';
import classes from './Spinner.module.css';

function Spinner() {
  return (
    <div className={classes.spinner}>
      <svg>
        <use xlinkHref={`${svg}#icon-loader`}></use>
      </svg>
    </div>
  );
}

export default Spinner;
