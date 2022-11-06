import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {loadImages, selectPage} from '../features/bgImages/bgImagesSlice';
import BackgroundImg from '../features/bgImages/BackgroundImg';
import BGControls from '../features/bgImages/BGControls';
import Quote from '../features/quote/Quote';
import Todos from '../features/todos/Todos';
import Weather from '../features/weather/Weather';
import styles from './App.module.css';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);

  /*
    Get parameters such as outer browser width and device pixel ratio
    for unsplash's dynamic url. (https://unsplash.com/documentation#dynamically-resizable-images)
  */
  const dpr = window.devicePixelRatio;
  const w = window.outerWidth;

  useEffect(() => {
    dispatch(loadImages({page, dpr, w}));
  }, [dispatch, dpr]);

  return (
    <div className={styles.app}>
      <BackgroundImg />
      <Weather />
      <main className={styles['app__main-content']}>
        <Todos />
      </main>
      <footer className={styles['app__footer']}>
        <BGControls dpr={dpr} w={w} />
        <Quote />
      </footer>
    </div>
  );
}

export default App;
