import {useAppDispatch, useAppSelector} from '../../app/hooks';
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

interface BGControlsProps {
  dpr: number;
  w: number;
}

const BGControls = ({dpr, w}: BGControlsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const images = useAppSelector(selectImages);
  const imgNum = useAppSelector(selectImgNum);

  const {name = 'John Doe', link = '#'} =
    images.length > 0 ? images[imgNum].author : {};

  const nextImg = () => {
    /*
      If an already downloaded collection of image urls is close to its end
      try to downlad more images from an api, or if there is no new images
      reset current displayed image to the first image from the downloaded collection
    */
    if (imgNum + 1 >= images.length) {
      dispatch(loadImages({page: page + 1, dpr, w}))
        .unwrap()
        .then(() => {
          dispatch(nextPage());
          dispatch(nextImgNum());
        })
        .catch((err) => {
          if (err.message === 'end of collection') {
            dispatch(resetImgNum());
          }
        });
      return;
    }
    dispatch(nextImgNum());
  };

  const prevImg = () => {
    /*
      If current image is the first image of the images array (has the index of 0)
      then do nothing.
    */
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
