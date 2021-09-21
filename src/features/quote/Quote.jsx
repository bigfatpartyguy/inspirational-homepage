import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectQuote, loadQuote} from './quoteSlice';
import styles from './Quote.module.css';

const Quote = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQuote());
  }, [dispatch]);

  const {author, quote} = useSelector(selectQuote);
  return (
    <div className={styles['quote']}>
      <p className={styles['quote__quote-text']}>{quote}</p>
      <p className={styles['quote__author']}>{author}</p>
    </div>
  );
};

export default Quote;
