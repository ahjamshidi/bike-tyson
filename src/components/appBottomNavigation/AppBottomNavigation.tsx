import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { CONFIG } from '@/constances/config';
export default function AppBottomNavigation() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const routeNames = CONFIG.PageRoute;

  const initpath = CONFIG.MainPages.includes(location.pathname)
    ? location.pathname
    : '';
  const [value, setValue] = React.useState(initpath);

  // Function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('jwt');
    setIsAuthenticated(!!token);
  };

  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{ maxWidth: 125 }}
          label="Explore"
          icon={<FmdGoodRoundedIcon />}
          value={routeNames.HomePage.path}
        />
        <BottomNavigationAction
          label="Bikes"
          icon={<DirectionsBikeRoundedIcon />}
          value={routeNames.MyBikesPage.path}
          sx={{ maxWidth: 125 }}
        />
        <BottomNavigationAction
          label="Reports"
          icon={<ListAltRoundedIcon />}
          value={routeNames.UserReportsPage.path}
          sx={{ maxWidth: 125 }}
        />
        <BottomNavigationAction
          label={isAuthenticated ? 'Profile' : 'Login'}
          icon={<AccountCircleRoundedIcon />}
          value={
            isAuthenticated ? routeNames.profile.path : routeNames.login.path
          }
          sx={{ maxWidth: 125 }}
        />
      </BottomNavigation>
    </Box>
  );
}
