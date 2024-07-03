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
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '@/constances/config';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  profile_pic_url: string;
}

const ProfilePage = ({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    pageTitleHandler(CONFIG.PageRoute.profile.title);
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(CONFIG.BaseURL + '/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response)
        console.log(token)

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

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user_id');
    localStorage.setItem('isVisited', 'false');
    navigate(CONFIG.PageRoute.welcome.path);
  };

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

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-UK').format(new Date(dateString));
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
          padding: '0 20px',
          boxSizing: 'border-box',
          mt: 8,
          pb: 7,
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          height='100%'
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
              {user.phone_number && (
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.phone_number} />
                </ListItem>
              )}
              {user.address && (
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.address} />
                </ListItem>
              )}
              {user.date_of_birth && (
                <ListItem>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <ListItemText primary={formatDate(user.date_of_birth)} />
                </ListItem>
              )}
            </List>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: 360,
              mb: 2,
            }}
          >
            <Button
              variant='contained'
              color='primary'
              sx={{ height: '50px', flex: 1, mr: 1 }}
              onClick={() =>
                navigate(`${CONFIG.PageRoute.editUser.path}`, {
                  state: { user },
                })
              }
            >
              Edit profile
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ height: '50px', flex: 1, ml: 1 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
          {error && (
            <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
