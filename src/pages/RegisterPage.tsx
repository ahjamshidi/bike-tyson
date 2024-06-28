import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
  Divider,
  useTheme,
} from '@mui/material';
import GoogleLoginComponent from '@/components/googleLogin/GoogleLogin';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
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
          Register
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
        <Box display='flex' justifyContent='space-between' width='100%'>
          <TextField
            label='First Name'
            variant='outlined'
            margin='normal'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mr: 1 }}
          />
          <TextField
            label='Last Name'
            variant='outlined'
            margin='normal'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ ml: 1 }}
          />
        </Box>
        <TextField
          fullWidth
          label='Email'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label='Create a password'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label='Confirm password'
          type={showConfirmPassword ? 'text' : 'password'}
          variant='outlined'
          margin='normal'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mt: 2, mb: 2, height: '50px' }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Divider sx={{ width: '100%', mb: 2, color: theme.palette.divider }}>
          Or Register with
        </Divider>
        <Box sx={{ width: '100%', mb: 2 }}>
          <GoogleLoginComponent />
        </Box>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Already have an account? <Link href='/login'>Log in</Link>
        </Typography>
      </Box>
    </>
  );
};

export default RegisterPage;
