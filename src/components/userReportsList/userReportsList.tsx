import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';
import UserReportCard from "@/components/userReportCard/userReportCard.tsx";
import {UserReport} from "@/interfaces/userReport.ts";


export default function UserReportsList() {
    const [userReport, setUserReport] = useState<UserReport[]>([]);
    useEffect(() => {
        fetchWrapper
            .get(`${CONFIG.BaseURL}/api/user-reports`)
            .then((response) => {
                setUserReport(response);
            })
            .catch((error) => console.error('Failed to fetch user reports:', error));
    }, []);

    return (
        <>
            <Box component="div">
                <Grid container rowSpacing={2}>
                    {userReport &&
                        userReport.map((data: UserReport) => (
                            <Grid item xs={12} key={data.id}>
                                <UserReportCard UserReportData={data} />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </>
    );
}
