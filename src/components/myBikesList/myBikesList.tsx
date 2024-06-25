import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import BikeCard from '../bikeCard/bikeCard';
import { useEffect, useState } from 'react';

export default function MyBikesList() {
  const [bike, setBike] = useState([]);

  useEffect(() => {
    // Fetch bike details from the API
    fetch('http://localhost:3000/api/bicycles')
      .then(response => response.json())
      .then(data => {
        setBike(data);
      })
      .catch(error => console.error('Failed to fetch bike details:', error));
  }, []);

  return (
    <>
      <Box
        component="div"
      >
        <Grid container sx={{width:'100%'}}>
          {/* Here the Action Bike Bar will render */}
          <Grid item xs={12} sm={12} sx={{textAlign:'center'}}>
            <Typography sx={{ fontSize: 18 }} color="text.secondary">
              Add, report or edit your bikes.
            </Typography>
            <Link to= "/AddBikePage">
              <Fab>
                <AddIcon></AddIcon>
                </Fab>
              </Link>
        </Grid>
        <Grid container spacing={4}>
            {bike && bike.map(data=> {
              return (
                <Grid item>
                <BikeCard BikeData= {data} ></BikeCard>
                </Grid>
              )
            }) }
        </Grid>
        </Grid>
      </Box>
    </>
  );
}
