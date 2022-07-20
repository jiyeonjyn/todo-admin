import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthSigninMutation from '../../hooks/auth/useAuthSigninMutation';
import { LocalUser, logIn } from '../../service/auth_service';
import { SignInForm } from '../../types/forms';
import styles from './sign_in.module.css';

const SignIn = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInForm>();

  const { mutate } = useAuthSigninMutation();
  const onSubmit: SubmitHandler<SignInForm> = (data) => {
    mutate(data, {
      onSuccess: (response) => {
        const data = response.data;
        const user: LocalUser = {
          userId: data.userId,
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
        };
        logIn(user, data.accessToken);
        navigate('/menu1');
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
