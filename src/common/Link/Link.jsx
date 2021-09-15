import React from 'react';
import styles from './Link.module.css';

const Link = ({href, children}) => {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
      title=""
    >
      {children}
    </a>
  );
};

export default Link;
