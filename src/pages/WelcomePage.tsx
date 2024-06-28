import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';

const WelcomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleVisitApp = () => {
    localStorage.setItem('isVisited', 'true');
    window.location.reload();
  };

  const handleLoginPage = () => {
    localStorage.setItem('isVisited', 'false');
    navigate('/login');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-end'
      height='100vh'
      bgcolor={theme.palette.primary.dark}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        bgcolor='tranparent'
        borderRadius={2}
        p={4}
      >
        <img
          src='./../../public/welcome_bike.png'
          alt='logo'
          style={{ maxHeight: '200px', marginBottom: '20px' }}
        />
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        bgcolor='white'
        width='100%'
        borderRadius={2}
        p={4}
        mt={2}
      >
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            fontWeight: 'bold',
          }}
        >
          Welcome to BikeTyson
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem sx={{ padding: '4px 0' }}>
            <ListItemText
              primary={
                <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                  • Report bike thefts to the community
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ padding: '4px 0' }}>
            <ListItemText
              primary={
                <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                  • See risky areas in Berlin for your parked bike
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ padding: '4px 0' }}>
            <ListItemText
              primary={
                <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                  • Report when bikes are found
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ padding: '4px 0' }}>
            <ListItemText
              primary={
                <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                  • Interesting information for bike lovers
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Divider sx={{ width: '100%', my: 2 }}>Start Here</Divider>
        <Box mt={2}>
          <Button
            variant='contained'
            sx={{
              backgroundColor: theme.palette.primary.dark,
              marginRight: '10px',
              width: '150px',
              height: '50px',
            }}
            onClick={handleLoginPage}
          >
            Login
          </Button>
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'black',
              width: '150px',
              height: '50px',
            }}
            onClick={handleVisitApp}
          >
            Visit App
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
