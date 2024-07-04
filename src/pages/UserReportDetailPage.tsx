import { Box } from '@mui/material';
import UserReportDetail from "@/components/userReportDetail/userReportDetail.tsx";
import { useEffect } from 'react';
import { CONFIG } from '@/constances/config';


export default function UserReportDetailPage ({
    pageTitleHandler,
  }: {
    pageTitleHandler: React.Dispatch<React.SetStateAction<string>>;
  }) {
    useEffect(() => {
      pageTitleHandler(CONFIG.PageRoute.UserReportPage.title);
    }, []);
    return (
        <Box sx={{
            width: '100%',
            maxWidth: '500px',
            overflowY: 'auto',
            maxHeight: 'calc(100dvh - 120px)',
            padding: '0 20px',
            boxSizing: 'border-box',
            mt: 8,
            pb: 7,
        }}>
            <UserReportDetail></UserReportDetail>
        </Box>
    );
}
