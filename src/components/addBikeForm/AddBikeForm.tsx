import { useState } from 'react';
import { Box, TextField, Button, Container, Grid, InputAdornment, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function AddBikeForm() {

  const [bikeData, setBikeData] = useState({
    user_id: 1,
    name: '',
    brand: '',
    model: '',
    type: '',
    value: '',
    frame_num: '',
    frame_size: '',
    colour: '',
    gender: '',
    description: '',
    photos_url: [],
    owner: true
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setBikeData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateBike = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bicycles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bikeData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
    // these properties need to be adjusted once we have an 'App Container' that sets margins top and bottom.
    sx={{
      display: 'flex', // Enables flexbox
      flexDirection: 'column', // Stack children vertically
      justifyContent: 'center', // Center vertically in the container
      alignItems: 'center', // Center horizontally in the container
      height: '100vh', // Full viewport height
      padding: '0 16px',
    }}
    >
      <Box
        component="form"
        sx={{
              width: '100%', // Use the full width of the container
          maxWidth: '500px', // Maximum width of the form for larger devices
          '& .MuiTextField-root': { m: 1, width: '100%' },
          overflowY: 'auto', // Make it scrollable
          maxHeight: '90vh', // Maximum height before scrolling
          padding: '20px', // Padding inside the form
          boxSizing: 'border-box'
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="name"
                id="bike-name"
                label="Bike's name"
                placeholder="My bike"
                value={bikeData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="Owner">Owner</InputLabel>
              <Select
                label="owner"
                id="bike-owner"
                name="owner"
                value={bikeData.owner}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="brand"
                id="bike-brand"
                label="Brand"
                placeholder="Trek / Cube"
                value={bikeData.brand}
                onChange={handleChange}
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
                value={bikeData.model}
                onChange={handleChange}
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
                value={bikeData.frame_num}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="frame-size-label">Frame Size</InputLabel>
              <Select
                labelId="frame-size-label"
                id="frame-size"
                name="frame_size"
                value={bikeData.frame_size}
                onChange={handleChange}
                label="Frame Size"
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="colour"
                id="bike-colour"
                label="Colour"
                placeholder="Colour"
                value={bikeData.colour}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="bike-gender-label">Gender</InputLabel>
              <Select
                labelId="bike-gender-label"
                id="bike-gender"
                name="gender"
                value={bikeData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="F">F</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="type"
                id="bike-type"
                label="Type"
                placeholder="Type"
                value={bikeData.type}
                onChange={handleChange}
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
                value={bikeData.description}
                onChange={handleChange}
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
                value={bikeData.value}
                onChange={handleChange}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: {
                    min: 0,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
              variant='contained'
              onClick={handleCreateBike}
              fullWidth
              >Add Bike</Button>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Box>
    </Container>
  );
}