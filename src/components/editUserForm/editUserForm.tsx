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
import {CONFIG} from "@/constances/config.ts";

const validatePhoneNumber = (value: string) => {
  const pattern =
      /^\+?\d{1,4}[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/;
  return pattern.test(value);
};

const validateEmail = (value: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function EditUserForm({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    email: user.email,
    address: user.address,
    date_of_birth: formatDate(user.date_of_birth),
    profile_pic_url: null as File | null,
  });

  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, first_name: event.target.value });
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, last_name: event.target.value });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, phone_number: value });
    setPhoneError(!validatePhoneNumber(value));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, email: value });
    setEmailError(!validateEmail(value));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, address: event.target.value });
  };

  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, date_of_birth: event.target.value });
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   setFormData({ ...formData, profile_pic_url: file });
  // };

  const handleSubmit = async () => {
    const token = localStorage.getItem('jwt');
    console.log("JSON.stringify(formData)", JSON.stringify(formData));
    try {
      const response = await fetch(`${CONFIG.BaseURL}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          // Convert date_of_birth back to ISO-8601 format before sending to server
          date_of_birth: new Date(formData.date_of_birth).toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Updated user data:', result);
        // Optional: Handle success UI feedback or navigation
      } else {
        console.error('Failed to update user data:', response.statusText);
        // Optional: Handle error UI feedback
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Optional: Handle error UI feedback
    }
  };

  return (
      <Container
          sx={{
            margin: '60px auto 0px auto',
            padding: '0 16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
      >
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} container justifyContent="center">
              <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  //onChange={handleFileChange}
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
              {formData.profile_pic_url && <p>{formData.profile_pic_url.name}</p>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  required
                  id="first-name"
                  label="First name"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleFirstNameChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  required
                  id="last-name"
                  label="Last name"
                  value={formData.last_name}
                  onChange={handleLastNameChange}
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
                  value={formData.email}
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
                  value={formData.phone_number}
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
                  value={formData.date_of_birth}
                  onChange={handleBirthdayChange}
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
                  value={formData.address}
                  onChange={handleAddressChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Save your profile data
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
  );
}
