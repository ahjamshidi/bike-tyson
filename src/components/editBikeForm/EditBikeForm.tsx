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


  // To handle edit bike

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBikeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bikeData || !bikeId) return;
    const updatedBikeData = { ...bikeData, id: parseInt(bikeId) };
    try {
      await fetchWrapper.put(`${CONFIG.BaseURL}/api/bicycles/`, updatedBikeData);
      alert('Bike updated successfully!');
    } catch (error) {
      console.error('Failed to update bike:', error);
    }
};

//To handle DELETE bike
const handleDelete = async () => {
  if (!bikeId) return;
  const bikeIdInt = parseInt(bikeId);
  try {
    await fetchWrapper._delete(`${CONFIG.BaseURL}/api/bicycles/${bikeIdInt}`);
    alert('Bike deleted successfully!');
  } catch (error) {
    console.error('Failed to delete bike:', error);
  }
};


  return (
    <>
      <Box
        component="form"
        noValidate={false}
        autoComplete="on"
        onSubmit={handleSubmit}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              fullWidth
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  min: "0.00",
                  step:"0.01"
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="outlined" size="medium" onClick={handleDelete} fullWidth>
              Delete Bike
            </Button>
            <Button type='submit' size="medium" variant="contained" fullWidth>
              Edit Bike
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
