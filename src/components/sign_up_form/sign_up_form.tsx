import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthSignupMutation from '../../hooks/useAuthSignupMutation';
import { SignUpUser } from '../../types/forms';
import styles from './sign_up_form.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUser>();

  const { mutate } = useAuthSignupMutation();
  const onSubmit: SubmitHandler<SignUpUser> = (data) => {
    mutate(data, {
      onSuccess: (data: any) => {
        console.log(data);
        navigate('/');
      },
      onError: (error: any) => console.log(error),
    });
  };

  return (
    <motion.form
      className={styles.container}
      layoutId="sign-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={styles.title}>Create Account</h2>
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
      <input
        className={styles.input}
        type="text"
        placeholder="NAME"
        {...register('userName', { required: true })}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="BIRTHDAY"
        {...register('userBirth', {
          required: true,
          minLength: { value: 8, message: '생년월일은 8자리로 입력해주세요.' },
          maxLength: { value: 8, message: '생년월일은 8자리로 입력해주세요.' },
        })}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="EMAIL"
        {...register('userEmail', {
          required: true,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '올바른 이메일 형식이 아닙니다.',
          },
        })}
      />
      <span className={styles.message}>
        {errors.userBirth?.message || errors.userEmail?.message}
      </span>
      <button className={styles.button}>SIGN UP</button>
    </motion.form>
  );
};

export default SignUpForm;
