import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




export default function AddBikeForm() {
  return (
    <Container
    // these properties need to be adjusted once we have an 'App Container' that sets margins top and bottom.
    sx={{
      margin: '60px auto 0px auto',
      padding: '0 16px',
      overflowY: 'auto',
    }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <Button
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
                id="bike-name"
                label="Bike's name"
                placeholder="My bike"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="owner"
                label="Owner"
                placeholder="John Doe"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bike-brand"
                label="Brand"
                placeholder="Trek / Cube"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bike-model-year"
                label="Model and year"
                placeholder="Dual Sport - 2019"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="frame-number"
                label="Frame number"
                placeholder="Your frame number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="frame-size"
                label="Frame Size"
                placeholder="S/M/L"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bike-color"
                label="Color"
                placeholder="Color"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bike-gender"
                label="Gender"
                placeholder="Male / Female"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth>Create</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}