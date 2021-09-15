import React from 'react';
import styles from './Button.module.css';

const Button = ({onClick, children}) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
