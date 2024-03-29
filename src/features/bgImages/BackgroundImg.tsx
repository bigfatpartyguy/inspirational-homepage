import {useAppSelector} from '../../app/hooks';
import {selectImages, selectImgNum} from './bgImagesSlice';

import styles from './BackgroundImg.module.css';

const BackgroundImg = (): JSX.Element => {
  const images = useAppSelector(selectImages);
  const imgNum = useAppSelector(selectImgNum);
  /*
    Get an image url and dynamically add it as a background using inline styles.
    Linear gradient is used in order add dark overlay to the bottom of an image
    for better readability of the footer elements on top of an image.
  */
  const bgStyle =
    images.length > 0
      ? {
          backgroundImage: `linear-gradient(transparent 50%, hsla(0, 0%, 0%, 0.1) 65%, hsla(0, 0%, 0%, 0.3) 80%, hsla(0, 0%, 0%, 0.5)), url(${images[imgNum]?.url})`,
        }
      : {};

  return (
    <>
      <div style={bgStyle} className={styles.bg}></div>
    </>
  );
};

export default BackgroundImg;
