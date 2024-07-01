import { Box } from '@mui/material';
import { CustomFilter } from './filter';
import CustomModal from '../modal/customModal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export interface IOptionListFilterModal {
  optionList: { label: string; value: any }[];
  defaultValue?: any;
  relatedFilterName: string;
  optionSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OptionListFilterModal(props: IOptionListFilterModal) {
  const { optionSelect, optionList, defaultValue, relatedFilterName } = props;
  // const [filterTitle, setFilterTitle] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (filterTitle === event.target.value) setFilterTitle('');
    // else setFilterTitle(event.target.value);
  };

  return (
    <>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={defaultValue}
          name="radio-buttons-group"
          sx={{ pl: 2 }}
          onChange={optionSelect}
        >
          {optionList &&
            optionList.map((option) => (
              <FormControlLabel
                value={option.value}
                name={relatedFilterName}
                control={<Radio />}
                label={option.label}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}
