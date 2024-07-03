import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
export interface IOptionListFilterModal {
  optionList: { label: string; value: any }[];
  defaultValue?: any;
  relatedFilterName: string;
  triggerFilterName: string;
  optionSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OptionListFilterModal(props: IOptionListFilterModal) {
  const { optionSelect, optionList, defaultValue, relatedFilterName } = props;

  return (
    <>
      <FormControl>
        <RadioGroup
          value={defaultValue}
          name="radio-buttons-group"
          sx={{ pl: 2 }}
          onChange={optionSelect}
        >
          {optionList &&
            optionList.map((option) => (
              <FormControlLabel
                key={option.value}
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
