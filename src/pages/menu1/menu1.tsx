import styles from './menu1.module.css';
import Header from '../../components/header/header';
import { postAdminTest } from '../../service/admin_service';
import { useState } from 'react';
import { TodoCMSMemberDto } from '../../types/dto';

const Menu1 = () => {
  const [array, setArray] = useState<TodoCMSMemberDto[]>([]);

  const onClick = async () => postAdminTest().then(console.log);

  return (
    <section className={styles.container}>
      <Header title="메뉴 1" />
      <div>
        <button onClick={onClick}>api 호출</button>
        {array.map((item, idx) => (
          <div key={idx}>
            <span>{item.a}</span>
            <span>{item.b}</span>
            <span>{item.c}</span>
            <span>{item.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu1;
