import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Grid,
  FormHelperText,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const validatePhoneNumber = (value: string) => {
  const pattern =
    /^\+?\d{1,4}[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/;
  return pattern.test(value);
};

const validateEmail = (value: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
};

export default function EditUserForm({ user }: { user: any }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPhoneNumber(value);
    setPhoneError(!validatePhoneNumber(value));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  return (
    <Container
      sx={{
        margin: '60px auto 0px auto',
        padding: '0 16px',
        overflowY: 'auto',
      }}
    >
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <p>Hello, Username!</p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                component="span"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Add a Photo
              </Button>
            </label>
            {selectedFile && <p>{selectedFile.name}</p>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="first-name"
              label="First name"
              placeholder="John"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="last-name"
              label="Last name"
              placeholder="Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="user-email"
              label="Email"
              placeholder="john@doe.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              fullWidth
            />
            {emailError && (
              <FormHelperText error>
                Please enter a valid email address.
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone-number"
              label="Phone number"
              placeholder="Your phone number"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={phoneError}
              fullWidth
            />
            {phoneError && (
              <FormHelperText error>
                Please enter a valid phone number.
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="user-birthday"
              label="Your birthday"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="user-address"
              label="Home address"
              placeholder="Home address"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
