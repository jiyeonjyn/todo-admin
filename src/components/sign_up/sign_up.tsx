import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuthSignupMutation from '../../hooks/auth/useAuthSignupMutation';
import { checkEmail, checkUserId } from '../../service/auth_service';
import { SignUpForm } from '../../types/forms';
import styles from './sign_up.module.css';

type Props = {
  toggleSignUp: () => void;
};

const SignUp = ({ toggleSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const { mutate } = useAuthSignupMutation();
  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate(data, {
      onSuccess: () => {
        alert('가입되었습니다.');
        toggleSignUp();
      },
      onError: (error) => console.log(error),
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
        {...register('userId', {
          required: true,
          maxLength: {
            value: 30,
            message: '아이디는 30자 이내로 입력해주세요.',
          },
          validate: async (v) =>
            (await checkUserId(v)) || '중복된 아이디입니다.',
        })}
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
        {...register('userName', {
          required: true,
          maxLength: { value: 10, message: '이름은 10자 이내로 입력해주세요.' },
        })}
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
          maxLength: {
            value: 100,
            message: '이메일은 100자 이내로 입력해주세요.',
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '올바른 이메일 형식이 아닙니다.',
          },
          validate: async (v) =>
            (await checkEmail(v)) || '중복된 이메일입니다.',
        })}
      />

      <span className={styles.message}>
        {errors.userId?.message ||
          errors.userName?.message ||
          errors.userBirth?.message ||
          errors.userEmail?.message}
      </span>
      <button className={styles.button}>SIGN UP</button>
    </motion.form>
  );
};

export default SignUp;
