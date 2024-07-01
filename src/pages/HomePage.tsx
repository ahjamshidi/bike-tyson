import { CustomFilterList } from '@/components/filters/filterList';
import { CurrentLocation } from '@/components/mapComponent/currentLocation';
import { CustomMap } from '@/components/mapComponent/customMap';
import { LoadDataOnMap } from '@/components/mapComponent/loadDataOnMap';
import { CONFIG } from '@/constances/config';
import { PoliceReportList } from '@/interfaces/policeReport';
import { getPoliceReportByDate } from '@/services/policeReportService';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface filterType {
  name: string;
  value: any;
}
export function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<PoliceReportList>();
  const [filterOptions, setFilterOptions] = useState<filterType | undefined>();
  useEffect(()=>{
    console.log(filterOptions);
    const getReport = async () => {
      const reports = await getPoliceReportByDate(filterOptions);
      setReportData(reports.lor_stats);
    };
    getReport();
      
  },[filterOptions])
  const showFilterList = [
    {
      name: 'Time',
      field:'start_datetime',
      filterOption: [
        { label: 'All', value: '' },
        { label: 'Lat Day', value: '1D' },
        { label: 'Last Week', value: '7D' },
        { label: 'Last Month', value: '1M' },
        { label: 'Last Year"', value: '1Y' },
      ],
    },
    {
      name: 'Report Type',
      field:'report_type',
      filterOption: [
        { label: 'Police', value: 'police' },
        { label: 'User', value: 'user' },
      ],
    },
  ];
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          overflowY: 'auto',
          position: 'absolute',
          left: 20,
          right: 0,
          top: 20,
        }}
      >
        <CustomFilterList filterList={showFilterList} setFilterOption={setFilterOptions}></CustomFilterList>
      </Box>
      <CustomMap defaultCenter={{ lat: 52.52, lng: 13.405 }}>
        <LoadDataOnMap reportData={reportData}></LoadDataOnMap>
        <Box sx={{ position: 'absolute', bottom: 140, right: 20 }}>
          <CurrentLocation></CurrentLocation>
        </Box>
        <Fab
          aria-label="add"
          sx={{
            position: 'absolute',
            bottom: 70,
            right: 20,
            backgroundColor: theme.palette.primary.dark,
          }}
          onClick={() => {
            navigate(CONFIG.PageRoute.stolenBikeReport.path);
          }}
        >
          <AddIcon sx={{ color: 'black' }} />
        </Fab>
      </CustomMap>
    </Box>
  );
}
