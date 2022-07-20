import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useGoHome = (isLoggedIn: boolean) => {
  const navigate = useNavigate();
  useEffect(() => {
    !isLoggedIn && navigate('/');
  }, [isLoggedIn, navigate]);
};

export default useGoHome;
