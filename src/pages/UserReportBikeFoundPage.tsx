import { Box } from '@mui/material';
import UserReportFound from "@/components/userReportBikeFound/userReportBikeFound.tsx";


export default function UserReportBikeFoundPage () {
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
            <UserReportFound></UserReportFound>
        </Box>
    );
}
