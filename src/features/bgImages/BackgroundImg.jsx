import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectImages,
  selectImgPage,
  nextImgPage,
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
  console.log(images);
  const imgPage = useSelector(selectImgPage);
  const bgStyle =
    images.length > 0 ? {backgroundImage: `url(${images[imgPage].url})`} : {};
  const {name = 'John Doe', link = '#'} =
    images.length > 0 ? images[imgPage].author : {};

  const nextImg = () => {
    console.log('working');
    if (imgPage + 1 >= images.length) {
      dispatch(nextPage());
      dispatch(loadImages({page: page, keyword: 'places'}));
      dispatch(nextImgPage());
      return;
    }
    dispatch(nextImgPage());
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
