import React from 'react';
import {useSelector} from 'react-redux';
import {selectQuote} from './quoteSlice';
import styles from './Quote.module.css';

const Quote = () => {
  const {author, quote} = useSelector(selectQuote);
  return (
    <div className={styles['quote']}>
      <p className={styles['quote__quote-text']}>{quote}</p>
      <p className={styles['quote__author']}>{author}</p>
    </div>
  );
};

export default Quote;
