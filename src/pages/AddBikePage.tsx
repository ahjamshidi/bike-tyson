import AddBikeForm from '@/components/addBikeForm/AddBikeForm';
import { Box } from '@mui/material';
import { useEffect } from 'react';
export function AddBikePage({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    pageTitleHandler('AddBikePage');
  }, []);
  return (
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
      <AddBikeForm></AddBikeForm>
    </Box>
  );
}
