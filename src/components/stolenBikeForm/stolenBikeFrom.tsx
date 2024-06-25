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
export function StolenBikeForm() {
  const theme = useTheme();

  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark'
          ? 'rgb(0 0 0 / 0.5)'
          : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }

      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `
  );

  const TriggerButton = styled('button')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

      &:hover {
        background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }

      &:active {
        background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
      }

      &:focus-visible {
        box-shadow: 0 0 0 4px
          ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
        outline: none;
      }
    `
  );
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            <TriggerButton type="button" onClick={handleOpen}>
              Open modal
            </TriggerButton>
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
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          slots={{ backdrop: StyledBackdrop }}
          
        >
          <ModalContent sx={{height:'100%',width:'100%',padding:0}}>
            <CustomMap></CustomMap>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
const Backdrop = React.forwardRef<
    HTMLDivElement,
    { open?: boolean; className: string }
  >((props, ref) => {
    const { open, className, ...other } = props;
    const customClName = open ? 'base-Backdrop-open' : '' + ' ' + className;
    return <div className={customClName} ref={ref} {...other} />;
  });