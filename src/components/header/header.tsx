import React from 'react';
import styles from './header.module.css';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default Header;
