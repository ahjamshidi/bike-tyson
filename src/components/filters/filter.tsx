import Chip from '@mui/material/Chip';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
export interface ICustomFilterProps {
  filterName: string;
  clickHandler: () => void;
}

export function CustomFilter(props: ICustomFilterProps) {
  const { filterName, clickHandler } = props;
  return (
    <>
      <Chip
        label={filterName}
        deleteIcon={
          <ArrowDropDownRoundedIcon sx={{ color: 'Black!important' }} />
        }
        onClick={clickHandler}
        onDelete={clickHandler}
        sx={{ backgroundColor: 'white', mx: 0.7, px: 1 }}
        variant="outlined"
      />
    </>
  );
}
