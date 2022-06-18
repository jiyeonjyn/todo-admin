import { Route, Routes } from 'react-router-dom';
import styles from './app.module.css';
import SideMenu from './components/side_menu/side_menu';
import Menu1 from './pages/menu1/menu1';

function App() {
  return (
    <section className={styles.container}>
      <SideMenu />
      <div className={styles.sideMenuSpace}></div>
      <Routes>
        <Route path="/" element={<Menu1 />} />
        <Route path="menu1" element={<Menu1 />} />
      </Routes>
    </section>
  );
}

export default App;
