import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import SideMenu from './components/side_menu/side_menu';
import Menu1 from './pages/menu1/menu1';
import SignIn from './pages/sign_in/sign_in';

function App() {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');

  return (
    <section className={styles.container}>
      {user.id && (
        <>
          <SideMenu />
          <div className={styles.sideMenuSpace}></div>
        </>
      )}
      <Routes>
        <Route path="/" element={user.aid ? <Menu1 /> : <SignIn />} />
        <Route path="menu1" element={<Menu1 />} />
      </Routes>
    </section>
  );
}

export default App;
