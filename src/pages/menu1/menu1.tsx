import styles from './menu1.module.css';
import Header from '../../components/header/header';

const Menu1 = () => {
  return (
    <section className={styles.container}>
      <Header title="메뉴 1" />
    </section>
  );
};

export default Menu1;
