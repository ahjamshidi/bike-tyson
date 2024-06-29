import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Alert,
  useTheme,
  Link,
} from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSendCode = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/auth/send-reset-code',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setSuccess('Reset code sent to your email.');
        setTimeout(() => {
          navigate('/reset-code', { state: { email } });
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send reset code.');
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='left'
        justifyContent='left'
        p={2}
        bgcolor='background.paper'
      >
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{
            borderRadius: '10px',
            border: '1px solid',
            borderColor: theme.palette.divider,
            mr: 2,
            left: '10px',
            top: '20px',
          }}
          onClick={handleBack}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
      </Box>
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
