import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function BikeSelector({ bikes }) {
  return (
    <Autocomplete
      id="country-select-demo"
      fullWidth
      options={bikes}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            '& > img': { mr: 2, flexShrink: 0 },
          }}
          {...props}
        >
          <img
            loading="lazy"
            width="60"
            srcSet={option.photos_url}
            src={option.photos_url}
            alt={option.name}
          />
          {option.name} ({option.brand}) +{option.model}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select from your bikes"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
