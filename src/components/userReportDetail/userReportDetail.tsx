import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    Typography, Box,
    // Button,
} from '@mui/material';
import { UserReport } from "@/interfaces/userReport.ts";
import { format, isYesterday } from 'date-fns';
import {CONFIG} from "@/constances/config.ts";
import {CustomMap} from "@/components/mapComponent/customMap.tsx";
import {Marker} from "@vis.gl/react-google-maps";


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

const extractCoordinates = (inputString: string): { latitude: number, longitude: number } | null => {
    console.log("IN",inputString);
    const regex = /Latitude: (\d+\.\d+), Longitude: (\d+\.\d+)/;
    const match = inputString.match(regex);

    if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        return { latitude, longitude };
    } else {
        return null;
    }
};

const UserReportDetailPage = () => {
    const location = useLocation();
    const { UserReportData } = location.state as { UserReportData: UserReport };
    const coordinates = extractCoordinates(UserReportData.gps);
    console.log('CO',coordinates);
    // const navigate = useNavigate();

    return (

        <>
            <Box component="div" sx={{ marginBottom: 2, marginTop:1}}>
                <div style={{width: '100%',height:'300px', marginBottom:'16px'}}>
                    <CustomMap defaultCenter={{lat: coordinates?.latitude, lng: coordinates?.longitude}}>
                        <Marker position={{lat: coordinates?.latitude, lng: coordinates?.longitude}} />
                    </CustomMap>
                </div>
                <Card sx={{minWidth: 275}}>
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
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Description: {UserReportData.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                {/*<Grid item xs={12} sm={12} style={{marginTop:'16px'}}>*/}
                {/*    <Button variant="contained" fullWidth onClick={() => navigate(`/UserReportBikeFoundPage/${UserReportData.id}`, {state: {UserReportData}})}>*/}
                {/*        Report Found*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
            </Box>
        </>
    );
}

export default UserReportDetailPage;
