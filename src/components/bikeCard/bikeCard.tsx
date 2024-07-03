import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Bicycle } from '@/interfaces/bike';
import { To, useNavigate } from 'react-router-dom';
import { CONFIG } from '@/constances/config';

export default function BikeCard({ BikeData }: { BikeData: Bicycle }) {
  // setting button navigations
  const navigate = useNavigate();
  const navigateToPath = (path: To) => {
    navigate(path);
  };
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={4}>
              <img
                width={'100%'}
                height={120}
                srcSet={`${
                  BikeData.photos_url[0]
                    ? BikeData.photos_url[0]
                    : CONFIG.BikeImgPlaceholder
                }`}
                src={`${BikeData.photos_url[0]}`}
                alt={BikeData.name}
                loading="lazy"
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="div">
                {BikeData.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {BikeData.brand}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {BikeData.model}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {BikeData.colour}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {BikeData.frame_num}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', mb: 1 }}>
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            onClick={() =>
              navigateToPath(
                `${CONFIG.PageRoute.EditBikePage.path.replace(
                  ':id',
                  BikeData.id || ''
                )}`
              )
            }
          >
            Edit
          </Button>
          <Button
            size="medium"
            variant="contained"
            fullWidth
            disabled={BikeData?.reports?.length !== 0 ? true : false}
            onClick={() =>
              navigateToPath(CONFIG.PageRoute.stolenBikeReport.path)
            }
          >
            {BikeData?.reports?.length !== 0 ? 'has reported' : 'Report'}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
