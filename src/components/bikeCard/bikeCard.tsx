import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import { Bicycle } from '@/interfaces/bike';
import { To, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function BikeCard({BikeData} : {BikeData: Bicycle}) {
  // setting button navigations
  const navigate = useNavigate();
  const navigateToPath = (path: To) => {
    navigate(path);
  };
  // setting color theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF5722',
      },
    },
  });

  return (
    <>

        <Grid container spacing={2}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Bike's Name: {BikeData.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Bike's Brand: {BikeData.brand}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Bike's Model: {BikeData.model}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Bike's Colour: {BikeData.colour}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Bike's Frame Number: {BikeData.frame_num}
              </Typography>
            </CardContent>
            <CardActions>
              <ThemeProvider theme = {theme}>
                <Button fullWidth onClick={() => navigateToPath('/editBike')}>
                  Edit Bike
                </Button>
                <Button variant="contained" fullWidth onClick={() => navigateToPath('/reportBike')}>
                  Report Bike
                </Button>
              </ThemeProvider>
            </CardActions>
          </Card>
        </Grid>

    </>
  );
}
