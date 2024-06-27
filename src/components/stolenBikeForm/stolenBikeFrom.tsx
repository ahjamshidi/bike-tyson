import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BikeSelector } from '../addBikeForm/bikeSelector';
import { CustomMap } from '../mapComponent/customMap';
import CustomModal from '../modal/customModal';
import useModal from '@/hooks/useModal';
import { CurrentLocation } from '../mapComponent/currentLocation';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useForm, SubmitHandler } from "react-hook-form"

interface StolenBikeFormInputs{

}
export function StolenBikeForm() {
  const theme = useTheme();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StolenBikeFormInputs>()
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
  const getMarkerLocation = (ev: MapCameraChangedEvent) => {
    console.log(ev.detail.center);
  };
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Last Time See Your Bike"
                sx={{ width: '100%' }}
                name='start'
                defaultValue={dayjs()}
                maxDateTime={dayjs().set('hour', dayjs().hour()).endOf('hour')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Notice Bike Was Stolen"
                sx={{ width: '100%' }}
                defaultValue={dayjs()}
                maxDateTime={dayjs().set('hour', dayjs().hour()).endOf('hour')}
              />
            </Grid>
          </LocalizationProvider>
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

        <CustomModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalTitle="Choos location on map"
          modalCloseElement={<span onClick={closeModal}>OK</span>}
        >
          <CustomMap
            defaultCenter={{ lat: 52.52, lng: 13.405 }}
            handleCenterChanged={getMarkerLocation}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 'calc(50% - 30px)',
                right: 'calc(50% - 30px)',
              }}
            >
              <LocationOnRoundedIcon
                sx={{
                  width: 60,
                  height: 60,
                  color: theme.palette.primary.dark,
                }}
              />
            </Box>
            <Box sx={{ position: 'absolute', bottom: 20, right: 20 }}>
              <CurrentLocation></CurrentLocation>
            </Box>
          </CustomMap>
        </CustomModal>
      </Box>
    </>
  );
}
