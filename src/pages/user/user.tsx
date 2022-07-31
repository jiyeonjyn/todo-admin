import styles from './user.module.css';
import Header from '../../components/header/header';
import useGoHome from '../../hooks/useGoHome';
import UserList from '../../components/user_list/user_list';
import SearchBar from '../../components/search_bar/search_bar';
import Filters from '../../components/filters/filters';

const searchFilters = [
  { name: '전체', value: 'all' },
  { name: 'ID', value: 'id' },
  { name: '이름', value: 'name' },
];

const listFilters = [
  { name: '🟢 활성화', value: 'active' },
  { name: '⚪️ 비활성화', value: 'inactive' },
  { name: '🐥 신규 가입자(최근 3개월)', value: 'new' },
];

const User = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  useGoHome(!!user.userId);

  return (
    <section className={styles.container}>
      <Header title="사용자 관리" />
      <main className={styles.main}>
        <SearchBar searchFilters={searchFilters} />
        <Filters listFilters={listFilters} />
        <UserList />
      </main>
    </section>
  );
};

export default User;
