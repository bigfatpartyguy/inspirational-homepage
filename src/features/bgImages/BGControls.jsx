import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectImages,
  selectImgNum,
  nextImgNum,
  prevImgNum,
  resetImgNum,
  loadImages,
  selectPage,
  nextPage,
} from './bgImagesSlice';
import Button from '../../common/Button';
import Link from '../../common/Link';
import {MdArrowForward, MdArrowBack} from 'react-icons/md';
import styles from './BGControls.module.css';

const BGControls = ({dpr, w}) => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const images = useSelector(selectImages);
  const imgNum = useSelector(selectImgNum);

  const {name = 'John Doe', link = '#'} =
    images.length > 0 ? images[imgNum]?.author : {};

  const nextImg = () => {
    if (imgNum + 1 >= images.length) {
      dispatch(loadImages({page: page + 1, dpr, w}))
        .unwrap()
        .then(() => {
          dispatch(nextPage());
          dispatch(nextImgNum());
        })
        .catch(err => {
          if (err.message === 'end of collection') {
            dispatch(resetImgNum());
          }
        });
      return;
    }
    dispatch(nextImgNum());
  };

  const prevImg = () => {
    if (imgNum - 1 < 0) {
      return;
    }
    dispatch(prevImgNum());
  };

  return (
    <div className={styles['bg__footer']}>
      <Button onClick={prevImg}>
        <MdArrowBack size="1.2em" />
      </Button>
      <Link href={link}>{name}</Link>
      <Button onClick={nextImg}>
        <MdArrowForward size="1.2em" />
      </Button>
    </div>
  );
};

export default BGControls;