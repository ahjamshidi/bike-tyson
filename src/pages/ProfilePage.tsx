import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  profile_pic_url: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile. Please try again.');
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
          Hello
        </Typography>
        <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold' }}>
          {user.first_name} {user.last_name}
        </Typography>
        <Avatar
          src={user.profile_pic_url}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Box
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            mb: 2,
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={user.phone_number} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={user.address} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary={user.date_of_birth} />
            </ListItem>
          </List>
        </Box>
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 2, mb: 2, height: '50px' }}
          onClick={() => navigate('/editUser')}
        >
          Edit profile
        </Button>
        {error && (
          <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default ProfilePage;
