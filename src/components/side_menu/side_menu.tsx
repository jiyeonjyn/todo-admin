import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './side_menu.module.css';

const SideMenu = () => {
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
      <div className={styles.logo}>
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link to="menu1">메뉴 1</Link>
            </li>
            <li>
              <Link to="/">메뉴 2</Link>
            </li>
            <li>
              <Link to="/">메뉴 3</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
