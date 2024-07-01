import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { CONFIG } from '@/constances/config';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginComponent: React.FC = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const navigate = useNavigate();

  const onSuccess = async (response: any) => {
    console.log('Login Success:', response);

    try {
      const res = await fetch(CONFIG.GoogleLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem('isVisited', 'true'); // visited app true
        localStorage.setItem('jwt', data.token); // Store the token
        const decodedToken: any = jwtDecode(data.token); // Decode the token
        localStorage.setItem('user_id', decodedToken.userId); //Store user_id
        navigate('/'); // Redirect to the home page or any protected route
      } else {
        console.error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const onFailure = () => {
    console.error('Login Failed');
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={0}
        width={'100%'}
        bgcolor="background.paper"
      >
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
            width={'100%'}
            containerProps={{}}
          />
        </GoogleOAuthProvider>
      </Box>
    </>
  );
};

export default GoogleLoginComponent;
