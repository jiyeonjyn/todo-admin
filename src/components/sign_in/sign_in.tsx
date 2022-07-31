import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '../../atoms';
import useAuthSigninMutation from '../../hooks/auth/useAuthSigninMutation';
import { LocalUser, logIn } from '../../service/auth_service';
import styles from './sign_in.module.css';

type Form = {
  userId: string;
  userPw: string;
};

const SignIn = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const { register, handleSubmit } = useForm<Form>();

  const { mutate } = useAuthSigninMutation();
  const onSubmit: SubmitHandler<Form> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        const data = response.data;
        const user: LocalUser = {
          userId: data.userId,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        };
        logIn(user, data.accessToken);
        setIsLoggedIn(true);
      },
      onError: (error) => alert(error.message),
    });
  };

  return (
    <motion.form
      className={styles.container}
      layoutId="sign-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.title}>Sign in to Website</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="ID"
        {...register('userId', { required: true })}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="PASSWORD"
        {...register('userPw', { required: true })}
      />
      <span className={styles.pwLink}>Forgot your password?</span>
      <button className={styles.button}>SIGN IN</button>
    </motion.form>
  );
};

export default SignIn;
