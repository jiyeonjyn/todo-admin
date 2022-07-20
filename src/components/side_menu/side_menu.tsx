import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sideMenuCon } from '../../contents';
import { logOut } from '../../service/auth_service';
import styles from './side_menu.module.css';
import { RiDashboardLine } from 'react-icons/ri';

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
      className={`${styles.container} ${isActive && styles.active}`}
      onClick={isActive ? undefined : toggleIsActive}
    >
      <span
        className={`${styles.toggleIcon} ${isActive && styles.active}`}
        onClick={isActive ? toggleIsActive : undefined}
      >
        <div></div>
        <div></div>
        <div></div>
      </span>
      <nav className={styles.menu}>
        <ul>
          <li className={styles.menuItem}>
            <Link to="/">
              <RiDashboardLine />
              <span>대시보드</span>
            </Link>
          </li>
          {sideMenuCon.map((item) => (
            <li key={item.path} className={styles.menuItem}>
              <Link to={item.path}>
                {item.icon({ color: 'inherit' })}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span className={styles.logOutBtn} onClick={handleLogOut}>
        로그아웃
      </span>
    </div>
  );
};

export default SideMenu;
