import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginNavbar from '@/components/loginNavbar/LoginNavbar';

const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state || {};

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    try {
      fetchWrapper
        .post(`${CONFIG.BaseURL}/auth/update-password`, {
          email,
          code,
          password,
        })
        .then((response: any) => {
          if (response.ok) {
            setSuccess(
              'Password updated successfully. Redirecting to login...'
            );
            setTimeout(() => {
              navigate('/login', { replace: true });
            }, 3000);
          } else {
            const errorData = response.json();
            setError(errorData.message || 'Failed to update password.');
            setTimeout(() => {
              setError(null);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error('Failed to update password:', error);
          setError('An unexpected error occurred. Please try again.');
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    } catch (error) {
      console.error('Error during password update:', error);
      setError('An unexpected error occurred. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <LoginNavbar />
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        p={2}
        bgcolor='background.paper'
      >
        <Typography variant='h4' gutterBottom>
          Update Password
        </Typography>
        {error && (
          <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
            {success}
          </Alert>
        )}
        <TextField
          fullWidth
          label='New Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label='Confirm New Password'
          type='password'
          variant='outlined'
          margin='normal'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
          onClick={handleUpdatePassword}
        >
          Update Password
        </Button>
      </Box>
    </>
  );
};

export default UpdatePassword;
