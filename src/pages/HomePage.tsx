import { CurrentLocation } from '@/components/mapComponent/currentLocation';
import { CustomMap } from '@/components/mapComponent/customMap';
import { LoadDataOnMap } from '@/components/mapComponent/loadDataOnMap';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, useTheme } from '@mui/material';
export function HomePage() {
  const theme = useTheme();
  return (
    <Box sx={{
      width: '100%',
      maxWidth: '500px',
      overflowY: 'auto',
      height: '100vh',
      
    }}>
      <CustomMap defaultCenter={{ lat: 52.52, lng: 13.405 }}>
        <LoadDataOnMap></LoadDataOnMap>
        <Box sx={{ position: 'absolute', bottom: 140, right: 20 }}>
          <CurrentLocation></CurrentLocation>
        </Box>
        <Fab
          aria-label="add"
          sx={{
            position: 'absolute',
            bottom: 70,
            right: 20,
            backgroundColor: theme.palette.primary.dark,
          }}
        >
          <AddIcon sx={{ color: 'black' }} />
        </Fab>
      </CustomMap>
    </Box>
  );
}
