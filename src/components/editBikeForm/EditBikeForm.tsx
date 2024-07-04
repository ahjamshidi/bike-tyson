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
import { useEffect, useState } from 'react';
import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { useNavigate } from 'react-router-dom';

export default function EditBikeForm({ bikeId }: any) {
  const navigate = useNavigate();
  // const initData =
  const [bikeData, setBikeData] = useState<Bicycle | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bikeId) {
      const token = localStorage.getItem('jwt');
      const fetchData = async () => {
        try {
          const response = await fetchWrapper.get(
            `${CONFIG.BaseURL}/api/bicycles/${bikeId}`,
            {
              Authorization: `Bearer ${token}`,
            }
          );
          setBikeData(response[0]);
        } catch (error) {
          console.error('Failed to fetch bike details:', error);
        }
      };
      fetchData();
    }
  }, []);

  // To handle edit bike

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target as HTMLInputElement;
    setBikeData((prev) => {
      if (!prev) {
        console.error('Bike data is undefined');
        return prev;
      }

      let parsedValue;
      if (name === 'value') {
        parsedValue = parseInt(value as string);
        if (isNaN(parsedValue)) {
          parsedValue = 0;
        }
      } else if (name === 'owner') {
        parsedValue = value === 'true';
      } else {
        parsedValue = value;
      }

      return { ...prev, [name!]: parsedValue };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bikeData || !bikeId) return;
    const token = localStorage.getItem('jwt');
    const data = { ...bikeData, id: parseInt(bikeId) };
    try {
      await fetch(`${CONFIG.BaseURL}/api/bicycles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      navigate('/my-bikes-list');
    } catch (error) {
      console.error('Failed to update bike:', error);
      setError('Failed to update bike.');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  //To handle DELETE bike
  const handleDelete = async () => {
    if (!bikeId) return;
    const token = localStorage.getItem('jwt');
    const data = { id: parseInt(bikeId) };
    try {
      await fetch(`${CONFIG.BaseURL}/api/bicycles`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      navigate('/my-bikes-list');
    } catch (error) {
      console.error('Failed to delete bike:', error);
      setError('Failed to delete bike.');
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
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <Button
              className='photos_url'
              component='label'
              role={undefined}
              variant='contained'
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Bike image
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='name'
              id='bike-name'
              label="Bike's name"
              placeholder='My bike'
              value={bikeData?.name || ''}
              onChange={handleInputChange}
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
                value={bikeData?.owner.toString()}
                onChange={handleInputChange}
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
              value={bikeData?.brand || ''}
              onChange={handleInputChange}
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
              value={bikeData?.model || ''}
              onChange={handleInputChange}
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
              value={bikeData?.frame_num || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='frame_size'
              id='frame-size'
              label='Frame Size'
              placeholder='Frame Size'
              value={bikeData?.frame_size || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='colour'
              id='bike-colour'
              label='Colour'
              placeholder='Colour'
              value={bikeData?.colour || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='gender'
              id='bike-gender'
              label='Gender'
              placeholder='Gender'
              value={bikeData?.gender || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name='type'
              id='bike-type'
              label='Type'
              placeholder='Type'
              value={bikeData?.type || ''}
              onChange={handleInputChange}
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
              value={bikeData?.description || ''}
              onChange={handleInputChange}
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
              value={bikeData?.value || ''}
              onChange={handleInputChange}
              fullWidth
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
                inputProps: {
                  min: '0.00',
                  step: '0.01',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant='outlined'
              size='medium'
              onClick={handleDelete}
              fullWidth
            >
              Delete Bike
            </Button>
            <Button type='submit' size='medium' variant='contained' fullWidth>
              Update Bike
            </Button>
          </Grid>
        </Grid>
        {error && <div>{error}</div>}
      </Box>
    </>
  );
}
