import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import DirectionsBikeRoundedIcon from '@mui/icons-material/DirectionsBikeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
export default function AppBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,zIndex:2}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Explore" icon={<FmdGoodRoundedIcon />} />
        <BottomNavigationAction
          label="Bikes"
          icon={<DirectionsBikeRoundedIcon />}
        />
        <BottomNavigationAction label="Reports" icon={<ListAltRoundedIcon />} />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleRoundedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
