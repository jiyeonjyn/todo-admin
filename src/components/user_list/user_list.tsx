import useUsersQuery from '../../hooks/user/useUsersQuery';
import { deleteUser } from '../../service/user_service';
import styles from './user_list.module.css';
import { IoMdTrash } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [isEditMode, setIsEditMode] = useState<EditState>({});
  const [isAddMode, setIsAddMode] = useState(false);

  const { data } = useUsersQuery(isLoggedIn, 0);

  const { register, watch, setValue } = useForm<Form>({
    defaultValues: { idArr: [] },
  });
  const idArr = watch('idArr');

  useEffect(() => {
    if (!data?.length) return;
    setIsEditMode((currVal) => {
      let newVal: EditState = {};
      data.map((user) => (newVal[user.id] = currVal[user.id] ?? false));
      return newVal;
    });
  }, [data]);

  const handleCheck: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.currentTarget.checked
        ? setValue('idArr', Object.keys(isEditMode))
        : setValue('idArr', []);
    },
    [setValue, isEditMode]
  );

  const checkRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!checkRef.current) return;
    checkRef.current.checked =
      idArr.length && idArr.length === Object.keys(isEditMode).length
        ? true
        : false;
  }, [isEditMode, idArr.length]);

  const toggleIsEditMode = useCallback((id: number) => {
    setIsEditMode((currVal) => ({ ...currVal, [id]: !currVal[id] }));
  }, []);
  const toggleIsAddMode = () => setIsAddMode((currVal) => !currVal);

  const handleDelete = useCallback((userid: string) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    deleteUser(userid);
  }, []);

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
              {isEditMode[user.id] ? (
                <>
                  <span className={styles.item}>{user.id}</span>
                  <UserForm
                    user={user}
                    onCancel={() => toggleIsEditMode(user.id)}
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
                    onClick={() => toggleIsEditMode(user.id)}
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
      <div className={`${isAddMode ? styles.addForm : styles.addBtn}`}>
        {isAddMode ? (
          <>
            <span className={styles.item}></span>
            <span className={styles.item}></span>
            <UserForm onCancel={toggleIsAddMode} />
          </>
        ) : (
          <span onClick={toggleIsAddMode}>
            <FiPlus />
          </span>
        )}
      </div>
    </section>
  );
};

export default UserList;
