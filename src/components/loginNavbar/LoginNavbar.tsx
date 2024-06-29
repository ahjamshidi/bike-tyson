import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNavigate } from 'react-router-dom';

const LoginNavbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBackBut = () => {
    navigate(-1);
  };

  return (
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
        onClick={handleBackBut}
      >
        <ArrowBackIosNewRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default LoginNavbar;
