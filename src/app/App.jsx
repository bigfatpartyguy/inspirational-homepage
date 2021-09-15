import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadImages} from '../features/bgImages/bgImagesSlice';
import BackgroundImg from '../features/bgImages/BackgroundImg';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImages({page: 1, keyword: 'places'}));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BackgroundImg />
    </div>
  );
}

export default App;
