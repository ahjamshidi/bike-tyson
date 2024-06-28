import UserReportsList from '@/components/userReportsList/userReportsList.tsx';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export function UserReportsPage({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    pageTitleHandler('UserReports');
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
      <UserReportsList></UserReportsList>
    </Box>
  );
}
