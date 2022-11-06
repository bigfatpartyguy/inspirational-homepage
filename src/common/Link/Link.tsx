import styles from './Link.module.css';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link = ({href, children}: LinkProps): JSX.Element => {
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
