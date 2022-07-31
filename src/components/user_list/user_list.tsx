import useUsersQuery from '../../hooks/user/useUsersQuery';
import { deleteUser } from '../../service/user_service';
import styles from './user_list.module.css';
import { IoMdTrash } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import UserForm from '../user_form/user_form';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../atoms';
import { useForm } from 'react-hook-form';

type EditState = {
  [key: number]: boolean;
};

type Form = {
  idArr: string[];
};

const UserList = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [edit, setEdit] = useState<EditState>({});
  const [add, setAdd] = useState(false);

  const { data } = useUsersQuery(isLoggedIn, 0);

  const { register, watch, setValue } = useForm<Form>({
    defaultValues: { idArr: [] },
  });
  const idArr = watch('idArr');

  useEffect(() => {
    if (!data?.length) return;
    setEdit((currVal) => {
      let newVal: EditState = {};
      data?.map((user) => (newVal[user.id] = currVal[user.id] ?? false));
      return newVal;
    });
  }, [data]);

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.checked
      ? setValue('idArr', Object.keys(edit))
      : setValue('idArr', []);
  };

  const checkRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!checkRef.current) return;
    checkRef.current.checked =
      idArr.length && idArr.length === Object.keys(edit).length ? true : false;
  }, [edit, idArr.length]);

  const setEditTrue = (id: number) =>
    setEdit((currVal) => ({ ...currVal, [id]: true }));

  const setEditFalse = (id: number) =>
    setEdit((currVal) => ({ ...currVal, [id]: false }));

  const handleDelete = (userid: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    deleteUser(userid);
  };

  return (
    <section className={styles.table}>
      <div className={styles.tableHeader}>
        <input
          ref={checkRef}
          type="checkbox"
          className={styles.check}
          onChange={handleCheck}
        />
        <span className={styles.item}>No</span>
        <span className={styles.item}>Id</span>
        <span className={styles.item}>이름</span>
        <span className={styles.item}>생년월일</span>
        <span className={styles.item}>이메일</span>
      </div>
      <ul className={styles.list}>
        {data?.length ? (
          data.map((user, idx) => (
            <li
              key={idx}
              className={`${styles.items} ${
                idArr.includes(`${user.id}`) && styles.selected
              }`}
            >
              <input
                type="checkbox"
                className={styles.check}
                value={user.id}
                {...register('idArr', { required: true })}
              />
              {edit[user.id] ? (
                <>
                  <span className={styles.item}>{user.id}</span>
                  <UserForm
                    user={user}
                    onCancel={() => setEditFalse(user.id)}
                  />
                </>
              ) : (
                <>
                  <span className={styles.item}>{user.id}</span>
                  <span className={styles.item}>{user.userid}</span>
                  <span className={styles.item}>{user.username}</span>
                  <span className={styles.item}>{user.userbirth}</span>
                  <span className={styles.item}>{user.useremail}</span>
                  <span
                    className={styles.icon}
                    onClick={() => setEditTrue(user.id)}
                  >
                    <MdModeEditOutline />
                  </span>
                  <span
                    className={styles.icon}
                    onClick={() => handleDelete(user.userid)}
                  >
                    <IoMdTrash />
                  </span>
                </>
              )}
            </li>
          ))
        ) : (
          <div className={styles.empty}>사용자가 없습니다.</div>
        )}
      </ul>
      <div className={`${add ? styles.addForm : styles.addBtn}`}>
        {add ? (
          <>
            <span className={styles.item}></span>
            <span className={styles.item}></span>
            <UserForm onCancel={() => setAdd(false)} />
          </>
        ) : (
          <span onClick={() => setAdd(true)}>
            <FiPlus />
          </span>
        )}
      </div>
    </section>
  );
};

export default UserList;
