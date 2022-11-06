import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectQuote, loadQuote} from './quoteSlice';
import styles from './Quote.module.css';

const Quote = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuote());
  }, [dispatch]);

  const {author, quote} = useAppSelector(selectQuote);
  return (
    <div className={styles['quote']}>
      <p className={styles['quote__quote-text']}>{quote}</p>
      <p className={styles['quote__author']}>{author}</p>
    </div>
  );
};

export default Quote;
