import styles from './user_form.module.css';
import { TiDelete } from 'react-icons/ti';
import { GiCheckMark } from 'react-icons/gi';
import { UserData } from '../../types/dto';
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  user?: UserData;
  onCancel: () => void;
};

type Form = {
  id: number;
  userid: string;
  username: string;
  userbirth: string;
  useremail: string;
};

const UserForm = ({ user, onCancel }: Props) => {
  const defaultValues = {
    id: user?.id,
    userid: user?.userid,
    username: user?.username,
    userbirth: user?.userbirth,
    useremail: user?.useremail,
  };
  const { register, handleSubmit } = useForm<Form>({ defaultValues });

  const onSubmit: SubmitHandler<Form> = (data) => {
    if (!window.confirm(user ? '수정하시겠습니까?' : '추가하시겠습니까?'))
      return;
    console.log(data);
  };

  return (
    <>
      <input
        className={styles.input}
        type="text"
        defaultValue={user?.userid}
        autoComplete="off"
        {...register('userid', { required: true })}
      />
      <input
        className={styles.input}
        type="text"
        defaultValue={user?.username}
        autoComplete="off"
        {...register('username', { required: true })}
      />
      <input
        className={styles.input}
        type="text"
        defaultValue={user?.userid}
        autoComplete="off"
        {...register('userbirth', { required: true })}
      />
      <input
        className={styles.input}
        type="text"
        defaultValue={user?.userid}
        autoComplete="off"
        {...register('useremail', { required: true })}
      />
      <span className={styles.icon} onClick={handleSubmit(onSubmit)}>
        <GiCheckMark />
      </span>
      <span className={styles.icon2} onClick={onCancel}>
        <TiDelete />
      </span>
    </>
  );
};

export default UserForm;
