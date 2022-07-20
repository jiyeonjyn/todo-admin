import styles from './user.module.css';
import Header from '../../components/header/header';
import { postAdminUsers } from '../../service/admin_service';
import { SyntheticEvent, useRef, useState } from 'react';
import { TodoCMSMemberDto } from '../../types/dto';
import useGoHome from '../../hooks/useGoHome';

const User = () => {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  useGoHome(!!user.userId);

  const [array, setArray] = useState<TodoCMSMemberDto[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    postAdminUsers().then((data) => data && setArray(data));
  };

  return (
    <section className={styles.container}>
      <Header title="사용자 관리" />
      <div>
        <form ref={formRef}>
          <input ref={inputRef} type="text" />
          <button onClick={onClick}>api 호출</button>
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, idx) => (
              <tr key={idx}>
                <td>{item.userid}</td>
                <td>{item.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default User;
