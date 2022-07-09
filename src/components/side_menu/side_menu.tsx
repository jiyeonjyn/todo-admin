import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../service/auth_service';
import styles from './side_menu.module.css';

const SideMenu = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => setIsActive((prev) => !prev);

  // 폼 비활성화
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    ({ target }: any) => {
      isActive && !containerRef.current?.contains(target) && setIsActive(false);
    },
    [isActive]
  );

  // const
  const handleLogOut = async () => {
    (await logOut()) && navigate('/');
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={containerRef}
      className={`${styles['side-bar']} ${isActive && styles.active}`}
      onClick={isActive ? undefined : toggleIsActive}
    >
      <span
        className={`${styles.ico} ${styles['ico-bars']} ${
          styles['toggle-side-bar-btn']
        } ${isActive && styles.active}`}
        onClick={isActive ? toggleIsActive : undefined}
      >
        <div></div>
        <div></div>
        <div></div>
      </span>
      <nav className={styles.menu}>
        <ul>
          <li>
            <Link to="menu1">메뉴 1</Link>
          </li>
          <li>
            <Link to="menu2">메뉴 2</Link>
          </li>
          <li>
            <Link to="menu3">메뉴 3</Link>
          </li>
        </ul>
      </nav>
      <span className={styles.logOutBtn} onClick={handleLogOut}>
        로그아웃
      </span>
    </div>
  );
};

export default SideMenu;
