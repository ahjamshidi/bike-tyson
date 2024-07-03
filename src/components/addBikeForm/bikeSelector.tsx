import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Bicycle } from '@/interfaces/bike';

export function BikeSelector({
  bikes,
  inputValue,
  onChangeHandler,
}: {
  bikes: any;
  inputValue: any;
  onChangeHandler: any;
}) {
  return (
    <Autocomplete
      id="bike-select-demo"
      fullWidth
      options={bikes}
      autoHighlight
      onChange={(e: React.BaseSyntheticEvent) => {
        onChangeHandler({
          target: { name: 'bike_id', value: e.target.value },
        });
      }}
      onInputChange={() => {}}
      getOptionLabel={(option: Bicycle) => option.name}
      renderOption={(props, option) => {
        return (
          <Box
            value={option.id}
            component="li"
            // key={}
            sx={{
              '& > img': { mr: 2, flexShrink: 0 },
            }}
            {...props}
          >
            <img
              loading="lazy"
              width="60"
              srcSet={option.photos_url[0]}
              src={option.photos_url[0]}
              alt={option.name}
            />
            {option.name} ({option.brand}) +{option.model}
          </Box>
        );
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Select from your bikes"
            name="bike_id"
            required
            value={inputValue}
            onChange={() => {}}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
            }}
          />
        );
      }}
    />
  );
}
