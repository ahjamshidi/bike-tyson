import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Bicycle } from '@/interfaces/bike';
import { useEffect, useState } from 'react';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';


export default function EditBikeForm({ bikeId }:any) {
  const [bikeData, setBikeData] = useState<Bicycle | null>(null);



  useEffect(() => {
    if (bikeId) {
      const fetchData = async () => {
        try {
          const response = await fetchWrapper.get(`${CONFIG.BaseURL}/api/bicycles/${bikeId}`);
          setBikeData(response[0])
        } catch (error) {
          console.error('Failed to fetch bike details:', error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <>
      <Box
        component="form"
        noValidate={false}
        autoComplete="on"
        // onSubmit={handleCreateBike}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <Button
              className="photos_url"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Bike image
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="name"
              id="bike-name"
              label="Bike's name"
              placeholder="My bike"
              value={bikeData?.name || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="owner"
              id="bike-owner"
              label="Owner"
              placeholder="Owner"
              value={bikeData?.owner || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="brand"
              id="bike-brand"
              label="Brand"
              placeholder="Trek / Cube"
              value={bikeData?.brand || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="model"
              id="bike-model-year"
              label="Model/Year"
              placeholder="Dual Sport - 2019"
              value={bikeData?.model || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="frame_num"
              id="frame-number"
              label="Frame number"
              placeholder="Your frame number"
              value={bikeData?.frame_num || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="frame_size"
              id="frame-size"
              label="Frame Size"
              placeholder="Frame Size"
              value={bikeData?.frame_size || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="colour"
              id="bike-colour"
              label="Colour"
              placeholder="Colour"
              value={bikeData?.colour || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="gender"
              id="bike-gender"
              label="Gender"
              placeholder="Gender"
              value={bikeData?.gender || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="type"
              id="bike-type"
              label="Type"
              placeholder="Type"
              value={bikeData?.type || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="description"
              id="bike-description"
              label="Description"
              placeholder="Description"
              value={bikeData?.description || ''}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="value"
              id="bike-value"
              label="Value"
              placeholder="Value"
              value={bikeData?.value || ''}
              fullWidth
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="outlined" size="medium" fullWidth>
              Delete Bike
            </Button>
            <Button size="medium" variant="contained" fullWidth>
              Edit Bike
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
