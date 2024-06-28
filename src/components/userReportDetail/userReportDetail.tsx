import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    Typography, Fab, useTheme,
} from '@mui/material';
import { UserReport } from "@/interfaces/userReport.ts";
import { format, isYesterday } from 'date-fns';
import {CONFIG} from "@/constances/config.ts";
import {CustomMap} from "@/components/mapComponent/customMap.tsx";
import {LoadDataOnMap} from "@/components/mapComponent/loadDataOnMap.tsx";
import {CurrentLocation} from "@/components/mapComponent/currentLocation.tsx";
import AddIcon from "@mui/icons-material/Add";

interface DateDisplayProps {
    date: Date;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
    if (isYesterday(date)) {
        return <span>Yesterday {format(date, 'h:mm a')}</span>;
    } else {
        return <span>{format(date, 'MMMM d, yyyy h:mm a')}</span>;
    }
}

const UserReportDetailPage = () => {
    const location = useLocation();
    const { UserReportData } = location.state as { UserReportData: UserReport };
    const theme = useTheme();

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Grid container columnSpacing={2}>
                    <Grid item xs={4}>
                        <img
                            width={'100%'}
                            height={120}
                            srcSet={`${UserReportData.bicycle.photos_url[0]
                                ? UserReportData.bicycle.photos_url[0]
                                : CONFIG.BikeImgPlaceholder
                            }`}
                            src={`${UserReportData.bicycle.photos_url[0]}`}
                            alt={`${UserReportData.bicycle.brand} ${UserReportData.bicycle.model}`}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6" component="div">
                            {`${UserReportData.bicycle.brand} ${UserReportData.bicycle.model}`}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Frame number: {UserReportData.bicycle.frame_num}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Bike colour: {UserReportData.bicycle.colour}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {<DateDisplay date={new Date(UserReportData.created_at)} />}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CustomMap>
                <LoadDataOnMap></LoadDataOnMap>
                <CurrentLocation></CurrentLocation>
                <Fab
                    aria-label="add"
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
        </Card>
    );
}

export default UserReportDetailPage;
