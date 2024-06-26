import * as React from 'react';
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
  Typography,
  useTheme,
} from '@mui/material';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/system';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BikeSelector } from '../addBikeForm/bikeSelector';
import { CustomMap } from '../mapComponent/customMap';
import CustomModal from '../modal/customModal';
import useModal from '@/hooks/useModal';
import { CurrentLocation } from '../mapComponent/currentLocation';
export function StolenBikeForm() {
  const theme = useTheme();
  const { isOpen, openModal, closeModal } = useModal();

  const bikeList = [
    {
      name: 'Mountain Bike',
      brand: 'Brand X',
      photos_url:
        'https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg',
    },
    {
      name: 'Mountain Bike',
      brand: 'Brand X',
      model: 'Model 123',
      photos_url:
        'https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg',
    },
    {
      name: 'Mountain Bike Mountain Bike Mountain Bike Mountain Bike',
      brand: 'Brand X',
      model: 'Model 123',
      photos_url:
        'https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg',
    },
    {
      name: 'Mountain Bike',
      brand: 'Brand X',
      model: 'Model 123',
      photos_url:
        'https://img.freepik.com/free-photo/white-bicycle-standing-park-morning-fitness-loneliness_1153-6768.jpg',
    },
  ];

  return (
    <>
      <Typography sx={{ mt: 2, mb: 2, color: theme.palette.text.secondary }}>
        We are sorry to hear your bike got stolen. Here you can report the theft
        of your bike to the community so others know which areas to avoid We
        suggest to create an official Police report: (030) 46644664 and at
        Police’s website: https://www.internetwache-polizei-berlin.de/
      </Typography>
      <Box component="form" noValidate={false} autoComplete="on">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <BikeSelector bikes={bikeList}></BikeSelector>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Choose Date and Time"
                sx={{ width: '100%' }}
                defaultValue={dayjs()}
                maxDateTime={dayjs().set('hour', dayjs().hour()).endOf('hour')}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={openModal}>
              select location
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="contained" fullWidth>
              Submit Report
            </Button>
          </Grid>
        </Grid>

        <CustomModal isOpen={isOpen} closeModal={closeModal}>
        <h2 id="unstyled-modal-title" className="modal-title">
            Text in a modal
          </h2>
          <p id="unstyled-modal-description" className="modal-description">
            Aliquid amet deserunt earum!
          </p>
          {/* <CustomMap>
            <CurrentLocation></CurrentLocation>
          </CustomMap> */}
        </CustomModal>
      </Box>
    </>
  );
}
