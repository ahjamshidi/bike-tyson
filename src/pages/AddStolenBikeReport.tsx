import * as React from 'react';
import { Box } from '@mui/material';
import { StolenBikeForm } from '@/components/stolenBikeForm/stolenBikeFrom';

export function AddStolenBikeReport({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  React.useEffect(() => {
    pageTitleHandler('AddStolenBikeReport');
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
      <StolenBikeForm></StolenBikeForm>
    </Box>
  );
}
