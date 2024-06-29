import React from 'react';
import LoginForm from '@/components/loginForm/LoginForm';
import LoginNavbar from '@/components/loginNavbar/LoginNavbar';

const LoginPage: React.FC = () => {
  return (
    <>
      <LoginNavbar />
      <LoginForm />
    </>
  );
};

export default LoginPage;
