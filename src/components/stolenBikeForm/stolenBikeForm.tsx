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
import { Dayjs } from 'dayjs';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { CONFIG } from '@/constances/config';
interface FormErrors {
  user_id?: string;
  bike_id?: string;
  start_datetime?: string;
  end_datetime?: string;
  gps?: string;
  description?: string;
}
interface FormData {
  user_id: number;
  bike_id: number;
  start_datetime: Dayjs;
  end_datetime: Dayjs;
  gps: string;
  description: string;
  lor_code?: string;
}
export function StolenBikeForm() {
  const theme = useTheme();
  const { isOpen, openModal, closeModal } = useModal();
  const initFormValue = {
    user_id: Number(localStorage.getItemItem('user_id')),
    bike_id: 0,
    start_datetime: dayjs(),
    end_datetime: dayjs(),
    gps: '',
    description: '',
    lor_code: '01100310',
  };
  const [formData, setFormData] = React.useState<FormData>(initFormValue);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [bikeList, setBikeList] = React.useState([]);
  const [formSubmitMsg, setFormSubmitMsg] = React.useState('');

  React.useEffect(() => {
    const fetchBikes = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          console.error('User is not authenticated');
          return;
        }

        const response = await fetchWrapper.get(
          `${CONFIG.BaseURL}/api/bicycles/user/${userId}`
        );
        setBikeList(response);
      } catch (error) {
        console.error('Failed to fetch bikes details:', error);
      }
    };

    fetchBikes();
  }, []);

  const validate = (name: string, value: any) => {
    let error = '';
    if (name === 'bike_id' && Number(value) === 0) {
      error = 'Name is required';
    }
    if (name === 'gps' && !value) {
      if (!value) {
        error = 'Location is required';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    validate(name, value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      validate(key, formData[key as keyof FormData]);
      return { ...acc, [key]: errors[key as keyof FormErrors] };
    }, {});
    if (!Object.values(formErrors).some((error) => error)) {
      // Submit the form
      console.log('Form submitted', formData);
      fetchWrapper
        .post(`${CONFIG.BaseURL}/api/user-reports/`, formData)
        .then((response) => {
          console.log(response);
          setFormData(initFormValue);
          setFormSubmitMsg('Your Report has been submitted');
        });
    } else {
      console.log('Form has errors', formErrors);
    }
  };

  const getMarkerLocation = (ev: MapCameraChangedEvent) => {
    //TODO fix set location
    setFormData((prevFormData) => ({
      ...prevFormData,
      gps: `Latitude: ${ev.detail.center.lat}, Longitude: ${ev.detail.center.lng}`,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, gps: '' }));
  };
  return (
    <>
      <Typography sx={{ mt: 2, mb: 2, color: theme.palette.text.secondary }}>
        We are sorry to hear your bike got stolen. Here you can report the theft
        of your bike to the community so others know which areas to avoid We
        suggest to create an official Police report: (030) 46644664 and at
        Police`s website: https://www.internetwache-polizei-berlin.de/
      </Typography>
      <Box
        component='form'
        noValidate={false}
        autoComplete='on'
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
            <BikeSelector
              bikes={bikeList}
              inputValue={formData.bike_id}
              onChangeHandler={handleChange}
            ></BikeSelector>
          </Grid>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='Last Time See Your Bike'
                sx={{ width: '100%' }}
                name='start_datetime'
                onChange={(value) => {
                  handleChange({
                    target: { name: 'start_datetime', value: value },
                  });
                }}
                value={formData.start_datetime}
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
                maxDateTime={dayjs().set('hour', dayjs().hour()).endOf('hour')}
              />
              {errors.start_datetime && (
                <Typography color='error'>{errors.start_datetime}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label='Notice Bike Was Stolen'
                sx={{ width: '100%' }}
                name='end_datetime'
                onChange={(value) => {
                  handleChange({
                    target: { name: 'end_datetime', value: value },
                  });
                }}
                value={formData.end_datetime}
                maxDateTime={dayjs().set('hour', dayjs().hour()).endOf('hour')}
              />
              {errors.end_datetime && (
                <Typography color='error'>{errors.end_datetime}</Typography>
              )}
            </Grid>
          </LocalizationProvider>
          <Grid item xs={12} sm={6}>
            <Button variant='contained' color='primary' onClick={openModal}>
              select location
            </Button>
            {errors.gps && <Typography color='error'>{errors.gps}</Typography>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Description'
              name='description'
              value={formData.description}
              multiline
              onChange={handleChange}
              rows={4}
            />
            <input type='hidden' name='gps' required value={formData.gps} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant='contained' type='submit' fullWidth>
              Submit Report
            </Button>
          </Grid>
        </Grid>
        {formSubmitMsg && (
          <Typography color='green' sx={{ textAlign: 'center' }}>
            {formSubmitMsg}{' '}
          </Typography>
        )}

        <CustomModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalTitle='Choos location on map'
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
