import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadImages, selectPage} from '../features/bgImages/bgImagesSlice';
import BackgroundImg from '../features/bgImages/BackgroundImg';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const dpr = window.devicePixelRatio;
  const w = window.outerWidth;
  useEffect(() => {
    dispatch(loadImages({page, dpr, w}));
  }, [dispatch, dpr]);

  return (
    <div className={styles.app}>
      <BackgroundImg dpr={dpr} />
    </div>
  );
}

export default App;
