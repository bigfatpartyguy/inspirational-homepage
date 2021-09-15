import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectImages,
  selectImgNum,
  nextImgNum,
  loadImages,
  selectPage,
  nextPage,
} from './bgImagesSlice';
import Button from '../../common/Button';
import Link from '../../common/Link';
import styles from './BackgroundImg.module.css';

const BackgroundImg = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const images = useSelector(selectImages);
  const imgNum = useSelector(selectImgNum);
  const bgStyle =
    images.length > 0 ? {backgroundImage: `url(${images[imgNum]?.url})`} : {};
  const {name = 'John Doe', link = '#'} =
    images.length > 0 ? images[imgNum]?.author : {};

  const nextImg = () => {
    console.log('working');
    if (imgNum + 1 >= images.length) {
      dispatch(loadImages({page: page + 1, keyword: 'places'})).then(() => {
        dispatch(nextPage());
        dispatch(nextImgNum());
      });
      return;
    }
    dispatch(nextImgNum());
  };

  return (
    <>
      <div style={bgStyle} className={styles.bg}></div>
      <div className={styles['bg__footer']}>
        <Link href={link}>{name}</Link>
        <Button onClick={nextImg}>Next Image</Button>
      </div>
    </>
  );
};

export default BackgroundImg;
