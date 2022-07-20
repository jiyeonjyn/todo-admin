import styles from './user.module.css';
import Header from '../../components/header/header';
import useGoHome from '../../hooks/useGoHome';
import UserList from '../../components/user_list/user_list';

const User = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  useGoHome(!!user.userId);

  return (
    <section className={styles.container}>
      <Header title="사용자 관리" />
      <main className={styles.main}>
        <UserList />
      </main>
    </section>
  );
};

export default User;
