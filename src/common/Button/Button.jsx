import React from 'react';
import styles from './Button.module.css';

const Button = ({className, onClick, children}) => {
  return (
    <button
      className={`${styles.btn} ${styles[className] || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
