import React, { useState } from 'react';
import {
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleLoginComponent from '../googleLogin/GoogleLogin';

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
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
        <TextField
          fullWidth
          label='Email address'
          variant='outlined'
          margin='normal'
          defaultValue='helloworld@gmail.com'
        />
        <TextField
          fullWidth
          label='Password'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          margin='normal'
          defaultValue='password'
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
        <Link href='#' variant='body2' sx={{ alignSelf: 'flex-end', mb: 2 }}>
          Forgot password?
        </Link>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          sx={{ mb: 2, height: '50px' }}
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
          Don't have an account? <Link href='#'>Sign up</Link>
        </Typography>
      </Box>
    </>
  );
};

export default LoginForm;
