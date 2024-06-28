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
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleLoginComponent from '../googleLogin/GoogleLogin';

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginBtn = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem('isVisited', 'true'); // visited app true
        localStorage.setItem('jwt', data.token); // Store the token
        navigate('/'); // Redirect to the home page or any protected route
      } else {
        console.error('Login failed: No token received');
        setError('Unauthorized: Invalid email or password');
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate('/register');
  };

  const handleForgotPassword = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate('/forgot-password');
  };

  return (
    <>
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
          Log in
        </Typography>
        {error && (
          <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
            {error}
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
        <TextField
          fullWidth
          label='Password'
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
        <Link
          href='#'
          variant='body2'
          sx={{ alignSelf: 'flex-end', mb: 2 }}
          onClick={handleForgotPassword}
        >
          Forgot password?
        </Link>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mb: 2, height: '50px' }}
          onClick={handleLoginBtn}
        >
          Log in
        </Button>
        <Divider sx={{ width: '100%', mb: 2, color: theme.palette.divider }}>
          Or Login with
        </Divider>
        <Box sx={{ width: '100%', mb: 2 }}>
          <GoogleLoginComponent />
        </Box>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href='#' onClick={handleSignUpClick}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginForm;
