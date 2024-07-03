import { CustomFilterList } from '@/components/filters/filterList';
import { CurrentLocation } from '@/components/mapComponent/currentLocation';
import { CustomMap } from '@/components/mapComponent/customMap';
import { LoadDataOnMap } from '@/components/mapComponent/loadDataOnMap';
import { ShowMarkersOnMap } from '@/components/mapComponent/showMarkersOnMap';
import { CONFIG } from '@/constances/config';
import { PoliceReportList } from '@/interfaces/policeReport';
import { UserReport } from '@/interfaces/userReport';
import { getAllReportByDate } from '@/services/policeReportService';
import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress, Fab, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface filterType {
  [key: string]: any;
}
export function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<{
    policeReport: PoliceReportList | undefined;
    userReport: UserReport[] | undefined;
  }>();
  const [filterOptions, setFilterOptions] = useState<filterType | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getReport = async () => {
      const reports = await getAllReportByDate(filterOptions);
      setReportData({ policeReport: undefined, userReport: undefined });
      setReportData(reports);
      setLoading(false);
    };
    getReport();
  }, [filterOptions]);
  const showFilterList = [
    {
      name: 'Time',
      field: 'start_datetime',
      filterOption: [
        { label: 'All', value: '' },
        { label: 'Lat Day', value: '1D' },
        { label: 'Last Week', value: '7D' },
        { label: 'Last Month', value: '1M' },
        { label: 'Last Year', value: '1Y' },
      ],
    },
    {
      name: 'Report Type',
      field: 'report_type',
      filterOption: [
        { label: 'Both', value: '' },
        { label: 'Police', value: 'police' },
        { label: 'User', value: 'user' },
      ],
    },
  ];
  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
        height: '100vh',
        position: 'relative',
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
        <CustomFilterList
          filterList={showFilterList}
          setFilterOption={setFilterOptions}
        ></CustomFilterList>
      </Box>

      <CustomMap defaultCenter={{ lat: 52.52, lng: 13.405 }}>
        <>
          <ShowMarkersOnMap
            reportData={reportData?.userReport}
          ></ShowMarkersOnMap>

          <LoadDataOnMap
            reportData={reportData?.policeReport?.lor_stats}
          ></LoadDataOnMap>
        </>
        {loading ? (
          <CircularProgress
            color="primary"
            sx={{
              position: 'absolute',
              top: 'calc(50% - 40px)',
              right: 'calc(50% - 40px)',
              zIndex: 20,
            }}
          />
        ) : (
          <></>
        )}
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
