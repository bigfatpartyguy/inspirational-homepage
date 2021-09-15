import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectImgUrls,
  selectImgPage,
  nextImgPage,
  loadImages,
} from './bgImagesSlice';
import Button from '../../common/Button';
import styles from './BackgroundImg.module.css';

const BackgroundImg = () => {
  const dispatch = useDispatch();
  const urls = useSelector(selectImgUrls);
  const imgPage = useSelector(selectImgPage);
  const bgStyle =
    urls.length > 0 ? {backgroundImage: `url(${urls[imgPage]})`} : {};

  const nextImg = () => {
    console.log('working');
    if (imgPage + 1 >= urls.length) {
      dispatch(nextImgPage());
      dispatch(loadImages({page: imgPage, keyword: 'places'}));
    }
    dispatch(nextImgPage());
  };

  return (
    <>
      <div style={bgStyle} className={styles.bg}></div>
      <div className={styles['bg__footer']}>
        <Button onClick={nextImg}>Next Image</Button>
      </div>
    </>
  );
};

export default BackgroundImg;
