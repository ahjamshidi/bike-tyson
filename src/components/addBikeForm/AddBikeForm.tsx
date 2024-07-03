import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Bicycle } from '@/interfaces/bike';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';

export default function AddBikeForm() {
  const [bikeData, setBikeData] = useState<Bicycle>({
    user_id: Number(localStorage.getItem('user_id')),
    name: '',
    brand: '',
    model: '',
    type: '',
    value: 0,
    frame_num: '',
    frame_size: '',
    colour: '',
    gender: '',
    description: '',
    photos_url: [],
    owner: true,
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === 'value') {
      parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        parsedValue = 0;
      }
    } else if (name === 'owner') {
      parsedValue = value === 'true';
    }
    setBikeData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleCreateBike = async () => {
    try {
      await fetchWrapper
        .post(`${CONFIG.BaseURL}/api/bicycles`, bikeData)
        .then(async (bikeResponse) => {
          setSuccess('Bike added successfully.');
          setTimeout(() => {
            setSuccess(null);
          }, 3000);

          if (files && files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append('photos', files[i]);
            }
            formData.append('itemId', bikeResponse.id); // Add the itemId to the form data
            formData.append('bucketName', CONFIG.BicycleBucketName); // Add the bucket name

            const photoResponse = await fetch(
              `${CONFIG.BaseURL}/api/photos/upload`,
              {
                method: 'POST',
                body: formData,
              }
            );

            if (!photoResponse.ok) {
              throw new Error('Failed to upload photos');
            }

            console.log('Photos uploaded successfully');
          }
        })
        .catch((error) => {
          console.error('Failed to add bike:', error);
          setError(error.message || 'Failed to add bike.');
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    } catch (error) {
      console.error('Error during adding bike:', error);
      setError('An unexpected error occurred. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <>
      <Box
        component='form'
        noValidate={false}
        autoComplete='on'
        onSubmit={handleCreateBike}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <Button
              className='photos_url'
              component='label'
              variant='contained'
              startIcon={<CloudUploadIcon />}
            >
              Bike image
              <input type='file' hidden multiple onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='name'
              id='bike-name'
              label="Bike's name"
              placeholder='My bike'
              value={bikeData.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id='Owner'>Owner</InputLabel>
              <Select
                label='owner'
                id='bike-owner'
                name='owner'
                value={bikeData.owner.toString()}
                onChange={handleChange}
              >
                <MenuItem value='true'>Yes</MenuItem>
                <MenuItem value='false'>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='brand'
              id='bike-brand'
              label='Brand'
              placeholder='Trek / Cube'
              value={bikeData.brand}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='model'
              id='bike-model-year'
              label='Model/Year'
              placeholder='Dual Sport - 2019'
              value={bikeData.model}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='frame_num'
              id='frame-number'
              label='Frame number'
              placeholder='Your frame number'
              value={bikeData.frame_num}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id='frame-size-label'>Frame Size</InputLabel>
              <Select
                labelId='frame-size-label'
                id='frame-size'
                name='frame_size'
                value={bikeData.frame_size}
                onChange={handleChange}
                label='Frame Size'
              >
                <MenuItem value='XS'>XS</MenuItem>
                <MenuItem value='S'>S</MenuItem>
                <MenuItem value='M'>M</MenuItem>
                <MenuItem value='L'>L</MenuItem>
                <MenuItem value='XL'>XL</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='colour'
              id='bike-colour'
              label='Colour'
              placeholder='Colour'
              value={bikeData.colour}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id='bike-gender-label'>Gender</InputLabel>
              <Select
                labelId='bike-gender-label'
                id='bike-gender'
                name='gender'
                value={bikeData.gender}
                onChange={handleChange}
                label='Gender'
              >
                <MenuItem value='M'>M</MenuItem>
                <MenuItem value='F'>F</MenuItem>
                <MenuItem value='U'>Unisex</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='type'
              id='bike-type'
              label='Type'
              placeholder='Type'
              value={bikeData.type}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='description'
              id='bike-description'
              label='Description'
              placeholder='Description'
              value={bikeData.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='value'
              id='bike-value'
              label='Value'
              placeholder='Value'
              value={bikeData.value.toString()} // Convert to string to avoid NaN warnings
              onChange={handleChange}
              fullWidth
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>€</InputAdornment>
                ),
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant='contained' fullWidth onClick={handleCreateBike}>
              Add Bike
            </Button>
          </Grid>
        </Grid>
        {success && <div>{success}</div>}
        {error && <div>{error}</div>}
      </Box>
    </>
  );
}
