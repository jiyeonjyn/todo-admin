import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import SideMenu from './components/side_menu/side_menu';
import Welcome from './pages/welcome/welcome';
import { httpClient } from './service/httpClient';
import { sideMenuCon } from './contents';
import Dashboard from './pages/dashboard/dashboard';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './atoms';

function App() {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  useEffect(() => {
    if (user.userId && !httpClient.defaults.headers.common['Authorization']) {
      httpClient.defaults.headers.common['Authorization'] = user.accessToken;
      httpClient.defaults.headers.common['refresh'] = user.refreshToken;
      setIsLoggedIn(true);
    }
  }, [user, setIsLoggedIn]);

  return (
    <section className={`${styles.container} ${isLoggedIn && styles.loggedIn}`}>
      {isLoggedIn && <div className={styles.sideMenuSpace}></div>}
      {isLoggedIn && <SideMenu />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Welcome />} />
        {sideMenuCon.map((item) => (
          <Route key={item.path} path={item.path} element={item.component()} />
        ))}
      </Routes>
    </section>
  );
}

export default App;
