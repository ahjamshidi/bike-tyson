import { Box, Grid, MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';
import UserReportCard from "@/components/userReportCard/userReportCard.tsx";
import { UserReport } from "@/interfaces/userReport.ts";
import { format, subDays, subMonths, subYears, isAfter } from 'date-fns';

export default function UserReportsList() {
    const [userReports, setUserReports] = useState<UserReport[]>([]);
    const [filteredReports, setFilteredReports] = useState<UserReport[]>([]);
    const [timeFilter, setTimeFilter] = useState<string>('last24h');
    const [dateTypeFilter, setDateTypeFilter] = useState<string>('created_at');
    const [brandFilter, setBrandFilter] = useState<string>('');

    useEffect(() => {
        fetchWrapper
            .get(`${CONFIG.BaseURL}/api/user-reports`)
            .then((response) => {
                setUserReports(response);
                setFilteredReports(response);
            })
            .catch((error) => console.error('Failed to fetch user reports:', error));
    }, []);

    useEffect(() => {
        applyFilters();
    }, [timeFilter, dateTypeFilter, brandFilter, userReports]);

    const handleTimeFilterChange = (event: SelectChangeEvent) => {
        setTimeFilter(event.target.value);
    };

    const handleDateTypeFilterChange = (event: SelectChangeEvent) => {
        setDateTypeFilter(event.target.value);
    };

    const handleBrandFilterChange = (event: SelectChangeEvent) => {
        setBrandFilter(event.target.value);
    };

    const applyFilters = () => {
        let filtered = userReports;

        // Apply time filter
        const now = new Date();
        let timeThreshold = now;
        switch (timeFilter) {
            case 'last24h':
                timeThreshold = subDays(now, 1);
                break;
            case 'lastWeek':
                timeThreshold = subDays(now, 7);
                break;
            case 'lastMonth':
                timeThreshold = subMonths(now, 1);
                break;
            case 'lastYear':
                timeThreshold = subYears(now, 1);
                break;
            default:
                break;
        }

        const dateField = dateTypeFilter === 'created_at' ? 'created_at' : 'end_datetime';
        filtered = filtered.filter(report => isAfter(new Date(report[dateField]), timeThreshold));

        // Apply brand filter
        if (brandFilter) {
            filtered = filtered.filter(report => report.bicycle.brand === brandFilter);
        }

        setFilteredReports(filtered);
    };

    return (
        <>
            <Box component="div" sx={{ marginBottom: 2, marginTop:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="time-filter-label">Time</InputLabel>
                            <Select
                                labelId="time-filter-label"
                                value={timeFilter}
                                label="Time"
                                onChange={handleTimeFilterChange}
                            >
                                <MenuItem value="last24h">Last 24h</MenuItem>
                                <MenuItem value="lastWeek">Last Week</MenuItem>
                                <MenuItem value="lastMonth">Last Month</MenuItem>
                                <MenuItem value="lastYear">Last Year</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="date-type-filter-label">Date Type</InputLabel>
                            <Select
                                labelId="date-type-filter-label"
                                value={dateTypeFilter}
                                label="Date Type"
                                onChange={handleDateTypeFilterChange}
                            >
                                <MenuItem value="created_at">Created At</MenuItem>
                                <MenuItem value="last_stolen">Last Stolen</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="brand-filter-label">Brand</InputLabel>
                            <Select
                                labelId="brand-filter-label"
                                value={brandFilter}
                                label="Brand"
                                onChange={handleBrandFilterChange}
                            >
                                <MenuItem value="">All Brands</MenuItem>
                                {Array.from(new Set(userReports.map(report => report.bicycle.brand))).map(brand => (
                                    <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Box component="div">
                <Grid container rowSpacing={2}>
                    {filteredReports &&
                        filteredReports.map((userReport: UserReport) => (
                            <Grid item xs={12} key={userReport.id}>
                                <UserReportCard UserReportData={userReport} />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </>
    );
}
