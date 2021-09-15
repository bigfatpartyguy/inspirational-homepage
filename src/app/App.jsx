import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadImages, selectPage} from '../features/bgImages/bgImagesSlice';
import BackgroundImg from '../features/bgImages/BackgroundImg';
import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  useEffect(() => {
    dispatch(loadImages({page: page, keyword: 'places'}));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BackgroundImg />
    </div>
  );
}

export default App;
