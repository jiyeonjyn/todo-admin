import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import SideMenu from './components/side_menu/side_menu';
import Menu1 from './pages/menu1/menu1';
import SignIn from './pages/sign_in/sign_in';

function App() {
  useLocation();
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');

  return (
    <section
      className={`${styles.container} ${user.userId && styles.loggedIn}`}
    >
      {user.userId && <div className={styles.sideMenuSpace}></div>}
      {user.userId && <SideMenu />}
      <Routes>
        <Route path="/" element={user.userId ? <Menu1 /> : <SignIn />} />
        {user.userId && <Route path="menu1" element={<Menu1 />} />}
      </Routes>
    </section>
  );
}

export default App;
