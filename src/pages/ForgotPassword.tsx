import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  useTheme,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from '@/components/loginNavbar/LoginNavbar';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';

const ForgotPassword: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      fetchWrapper
        .post(`${CONFIG.BaseURL}/auth/send-reset-code`, { email })
        .then(() => {
          setSuccess('Reset code sent to your email.');
          setTimeout(() => {
            navigate('/reset-code', { state: { email } });
          }, 3000);
        })
        .catch((error) => {
          console.error('Failed to send reset code:', error);
          setError(error || 'Failed to send reset code.');
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    } catch (error) {
      console.error('Error during sending reset code:', error);
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
        <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>
          Forgot Password?
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
          label='Email address'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography
          variant='body1'
          sx={{
            mt: 2,
            color: theme.palette.text.secondary,
          }}
        >
          Don't worry! It happens. Please enter the email associated with your
          account.
        </Typography>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mt: 2, mb: 2, height: '50px' }}
          onClick={handleSendCode}
        >
          Send Reset Code
        </Button>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Remember password? <Link href='/login'>Log in</Link>
        </Typography>
      </Box>
    </>
  );
};

export default ForgotPassword;
