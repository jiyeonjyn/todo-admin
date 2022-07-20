import useUsersQuery from '../../hooks/user/useUsersQuery';
import { deleteUser } from '../../service/user_service';
import styles from './user_list.module.css';
import { IoMdTrash } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';

const UserList = () => {
  const { data } = useUsersQuery(0);

  const handleDelete = (userid: string) => {
    deleteUser(userid);
    alert('삭제되었습니다.');
  };

  return (
    <section className={styles.table}>
      <div className={styles.tableHeader}>
        <span></span>
        <span className={styles.item}>id</span>
        <span className={styles.item}>name</span>
      </div>
      <ul className={styles.list}>
        {data?.map((item, idx) => (
          <li key={idx} className={styles.items}>
            <input type="checkbox" className={styles.check} />
            <span className={styles.item}>{item.userid}</span>
            <span className={styles.item}>{item.username}</span>
            <span className={styles.icon}>
              <MdModeEditOutline />
            </span>
            <span
              className={styles.icon}
              onClick={() => handleDelete(item.userid)}
            >
              <IoMdTrash />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserList;
