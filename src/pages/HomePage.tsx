import { CurrentLocation } from '@/components/mapComponent/currentLocation';
import { CustomMap } from '@/components/mapComponent/customMap';
import { LoadDataOnMap } from '@/components/mapComponent/loadDataOnMap';
import AddIcon from '@mui/icons-material/Add';
import { Fab, useTheme } from '@mui/material';
export function HomePage() {
  const theme = useTheme();
  return (
    <CustomMap>
      <LoadDataOnMap></LoadDataOnMap>
      <CurrentLocation></CurrentLocation>
      <Fab
        aria-label='add'
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
  );
}
