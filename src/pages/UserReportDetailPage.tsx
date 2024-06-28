import { Box } from '@mui/material';
import UserReportDetail from "@/components/userReportDetail/userReportDetail.tsx";


export function UserReportDetailPage () {
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
            <UserReportDetail></UserReportDetail>
        </Box>
    );
}
