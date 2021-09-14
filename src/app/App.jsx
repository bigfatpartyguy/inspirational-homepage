import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {loadImages, selectImgUrls} from '../features/bgImages/bgImagesSlice';
import styles from './App.module.css';

function App() {
  const urls = useSelector(selectImgUrls);
  const dispatch = useDispatch();
  console.log('urls', urls);
  const [imgPage, setImgPage] = useState(0);

  useEffect(() => {
    dispatch(loadImages({page: 1, keyword: 'places'}));
  }, [dispatch]);

  const nextImg = () => {
    if (imgPage + 1 >= urls.length) {
      dispatch(loadImages({page: 2, keyword: 'places'}));
      setImgPage(prevPage => prevPage + 1);
    }
    setImgPage(prevPage => prevPage + 1);
  };

  const bgStyle =
    urls.length > 0 ? {backgroundImage: `url(${urls[imgPage]})`} : {};

  return (
    <div className={styles.app}>
      <div style={bgStyle} className={styles.bg}></div>
      <button onClick={nextImg} className={styles.btn}>
        next img
      </button>
    </div>
  );
}

export default App;
