import React from 'react';
import {useSelector} from 'react-redux';
import {selectImages, selectImgNum} from './bgImagesSlice';

import styles from './BackgroundImg.module.css';

const BackgroundImg = () => {
  const images = useSelector(selectImages);
  const imgNum = useSelector(selectImgNum);
  const bgStyle =
    images.length > 0
      ? {
          background: `linear-gradient(transparent 70%, hsla(0, 0%, 0%, 1)), url(${images[imgNum]?.url})`,
        }
      : {};

  return (
    <>
      <div style={bgStyle} className={styles.bg}></div>
    </>
  );
};

export default BackgroundImg;
