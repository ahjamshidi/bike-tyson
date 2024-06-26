import MyBikesList from '@/components/myBikesList/myBikesList';
import { Box } from '@mui/material';


export function MyBikesPage () {
  return (
    <Box sx={{
      width: '100%',
      maxWidth: '500px',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 120px)',
      padding: '0 20px',
      boxSizing: 'border-box',
      mt: 8,
      pb: 7,
    }}>
      <MyBikesList></MyBikesList>
    </Box>
  );
}
