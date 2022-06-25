import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignInUser } from '../../types/forms';
import styles from './sign_in_form.module.css';

const SignInForm = () => {
  const { register, handleSubmit } = useForm<SignInUser>();

  const onSubmit: SubmitHandler<SignInUser> = (data) => console.log(data);

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
        {...register('password', { required: true })}
      />
      <span className={styles.pwLink}>Forgot your password?</span>
      <button className={styles.button}>SIGN IN</button>
    </motion.form>
  );
};

export default SignInForm;
