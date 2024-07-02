import { Box, Grid, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import BikeCard from '../bikeCard/bikeCard';
import { useEffect, useState } from 'react';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { Bicycle } from '@/interfaces/bike';

export default function MyBikesList() {
  const [bikes, setBikes] = useState<Bicycle[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('jwt');
      setIsAuthenticated(!!token);
    };

    const fetchBikes = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          console.error('User is not authenticated');
          return;
        }

        const response = await fetchWrapper.get(
          `${CONFIG.BaseURL}/api/bicycles/user/${userId}`
        );
        setBikes(response);
      } catch (error) {
        console.error('Failed to fetch bikes details:', error);
      }
    };

    checkAuthStatus();
    if (isAuthenticated) {
      fetchBikes();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Box component='div' sx={{ textAlign: 'center', marginTop: 3 }}>
        <Typography variant='h6' color='text.secondary'>
          You need to log in to access this functionality.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate(CONFIG.PageRoute.login.path)}
          sx={{ marginTop: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box component='div'>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ textAlign: 'center', marginBottom: 3 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{}} color='text.secondary'>
              Add your new bikes.
            </Typography>
            <Link to={CONFIG.PageRoute.AddBikePage.path}>
              <Fab
                size='medium'
                sx={{
                  borderRadius: '20%',
                  backgroundColor: '#fff',
                  boxShadow: 'none',
                  color: theme.palette.primary.dark,
                  border: 1,
                  borderColor: theme.palette.primary.dark,
                }}
              >
                <AddIcon />
              </Fab>
            </Link>
          </div>
        </Grid>
        <Grid container rowSpacing={2}>
          {bikes &&
            bikes.map((data: Bicycle) => (
              <Grid item xs={12} key={data.id}>
                <BikeCard BikeData={data} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
