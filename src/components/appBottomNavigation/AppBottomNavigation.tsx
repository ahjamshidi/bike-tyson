import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useLocation, useNavigate } from 'react-router-dom';
export default function AppBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const initpath = ['/','/MyBikesPage'].includes(location.pathname)?location.pathname:'';
  const [value, setValue] = React.useState(initpath);
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          navigate(newValue, { replace: true });
        }}
      >
        <BottomNavigationAction
          label="Explore"
          icon={<FmdGoodRoundedIcon />}
          value={'/'}
        />
        <BottomNavigationAction
          label="Bikes"
          icon={<DirectionsBikeRoundedIcon />}
          value={'/MyBikesPage'}
        />
        <BottomNavigationAction
          label="Reports"
          icon={<ListAltRoundedIcon />}
          value={'/UserReportsPage'}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleRoundedIcon />}
          value={'/editUser'}
        />
      </BottomNavigation>
    </Box>
  );
}
