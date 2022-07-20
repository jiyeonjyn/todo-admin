import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import SideMenu from './components/side_menu/side_menu';
import Welcome from './pages/welcome/welcome';
import { httpClient } from './service/httpClient';
import { sideMenuCon } from './contents';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  useLocation();
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  useEffect(() => {
    if (user.userId && !httpClient.defaults.headers.common['Authorization']) {
      httpClient.defaults.headers.common['Authorization'] = user.accessToken;
      httpClient.defaults.headers.common['refresh'] = user.refreshToken;
    }
  }, [user]);

  return (
    <section
      className={`${styles.container} ${user.userId && styles.loggedIn}`}
    >
      {user.userId && <div className={styles.sideMenuSpace}></div>}
      {user.userId && <SideMenu />}
      <Routes>
        <Route path="/" element={user.userId ? <Dashboard /> : <Welcome />} />
        {user.userId &&
          sideMenuCon.map((item) => (
            <Route path={item.path} element={item.component()} />
          ))}
      </Routes>
    </section>
  );
}

export default App;
