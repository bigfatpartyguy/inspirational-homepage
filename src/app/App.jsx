import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadImages, selectPage} from '../features/bgImages/bgImagesSlice';
import {loadQuote} from '../features/quote/quoteSlice';
import BackgroundImg from '../features/bgImages/BackgroundImg';
import BGControls from '../features/bgImages/BGControls';
import Quote from '../features/quote/Quote';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const dpr = window.devicePixelRatio;
  const w = window.outerWidth;
  useEffect(() => {
    dispatch(loadImages({page, dpr, w}));
  }, [dispatch, dpr]);

  useEffect(() => {
    dispatch(loadQuote());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BackgroundImg dpr={dpr} />
      <footer className={styles['app__footer']}>
        <BGControls dpr={dpr} w={w} />
        <Quote />
      </footer>
    </div>
  );
}

export default App;
