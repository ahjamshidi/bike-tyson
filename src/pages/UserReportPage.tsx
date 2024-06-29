import UserReportsList from '@/components/userReportsList/userReportsList.tsx';
import { CONFIG } from '@/constances/config';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export default function UserReportPage({
  pageTitleHandler,
}: {
  pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    pageTitleHandler(CONFIG.PageRoute.UserReportsPage.title);
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
