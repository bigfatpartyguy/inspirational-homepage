import React from 'react';
import styles from './ImageBG.module.css';

const ImageBG = ({src}) => {
  return <img className={styles.bg} src={src} alt="" />;
};

export default ImageBG;
