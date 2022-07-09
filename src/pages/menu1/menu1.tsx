import styles from './menu1.module.css';
import Header from '../../components/header/header';
import { postAdminUsers } from '../../service/admin_service';
import { useRef, useState } from 'react';
import { TodoCMSMemberDto } from '../../types/dto';

const Menu1 = () => {
  const [array, setArray] = useState<TodoCMSMemberDto[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // 값 입력 받는 방법
  // inputRef.current.value로 값에 접근 -> service 함수에 파라미터로 전달
  // 폼 제출 후 formRef.current.reset() 해주세요

  const onClick = async () =>
    postAdminUsers().then((data) => data && setArray(data));

  return (
    <section className={styles.container}>
      <Header title="메뉴 1" />
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

export default Menu1;
