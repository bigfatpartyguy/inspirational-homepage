import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  className?: string;
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button = ({
  className = '',
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${styles.btn as string} ${
        (styles[className] as string) || ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
