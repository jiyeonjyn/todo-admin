import { motion } from 'framer-motion';
import { useState } from 'react';
import SignInForm from '../../components/sign_in_form/sign_in_form';
import SignUpForm from '../../components/sign_up_form/sign_up_form';
import styles from './sign_in.module.css';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleIsSignUp = () => setIsSignUp((currVal) => !currVal);

  return (
    <section className={styles.container}>
      {!isSignUp && <SignInForm />}
      <motion.section
        className={`${styles.switchBox} ${isSignUp && styles.goLeft}`}
      >
        <h2 className={styles.title}>
          {isSignUp ? 'Welcome Back !' : 'Hello Friend !'}
        </h2>
        <p className={styles.description}>
          {isSignUp
            ? 'To keep connected with us please login with your personal info'
            : 'Enter your personal details and start journey with us'}
        </p>
        <button className={styles.button} onClick={toggleIsSignUp}>
          {isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </button>
      </motion.section>
      <div className={styles.space}></div>
      {isSignUp && <SignUpForm />}
    </section>
  );
};

export default SignIn;
