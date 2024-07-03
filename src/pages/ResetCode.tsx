import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginNavbar from '@/components/loginNavbar/LoginNavbar';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';

const ResetCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleVerifyCode = async () => {
    try {
      fetchWrapper
        .post(`${CONFIG.BaseURL}/auth/verify-reset-code`, { email, code })
        .then(() => {
          setSuccess('Code verified successfully.');
          setTimeout(() => {
            navigate('/update-password', { state: { email, code } });
          }, 3000);
        })
        .catch((error) => {
          console.error('Failed to verify reset code:', error);
          setError('Invalid reset code.');
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    } catch (error) {
      console.error('Error during code verification:', error);
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
          Enter Reset Code
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
          label='Reset Code'
          variant='outlined'
          margin='normal'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mt: 2, mb: 2, height: '50px' }}
          onClick={handleVerifyCode}
        >
          Verify Code
        </Button>
      </Box>
    </>
  );
};

export default ResetCode;
