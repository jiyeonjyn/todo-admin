import { motion } from 'framer-motion';
import { useState } from 'react';
import SignIn from '../../components/sign_in/sign_in';
import SignUp from '../../components/sign_up/sign_up';
import styles from './welcome.module.css';

const Welcome = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleSignUp = () => setIsSignUp((currVal) => !currVal);

  return (
    <section className={styles.container}>
      {!isSignUp && <SignIn />}
      <motion.section className={styles.switchBox} layout>
        <h2 className={styles.title}>
          {isSignUp ? 'Welcome Back !' : 'Hello Friend !'}
        </h2>
        <p className={styles.description}>
          {isSignUp
            ? 'To keep connected with us please login with your personal info'
            : 'Enter your personal details and start journey with us'}
        </p>
        <button className={styles.button} onClick={toggleSignUp}>
          {isSignUp ? 'SIGN IN' : 'SIGN UP'}
        </button>
      </motion.section>
      {isSignUp && <SignUp toggleSignUp={toggleSignUp} />}
    </section>
  );
};

export default Welcome;
