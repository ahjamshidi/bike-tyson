import { Box } from '@mui/material';
import { CustomFilter } from './filter';
import CustomModal from '../modal/customModal';
import useModal from '@/hooks/useModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { OptionListFilterModal } from './optionListFilterModal';
export interface ICustomFilterListProps {
  filterList: {
    name: string;
    filterOption: { label: string; value: any }[];
    field: string;
  }[];
  setFilterOption: Dispatch<SetStateAction<any>>;
}
interface filterType {
  name: string;
  value: any;
}
export function CustomFilterList(props: ICustomFilterListProps) {
  const { filterList, setFilterOption } = props;
  const { isOpen, openModal, closeModal } = useModal();
  const [filterTitle, setFilterTitle] = useState('');
  const openHandler = (title: string) => {
    setFilterTitle(title);
    openModal();
  };
  const filterSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOption((prev: filterType | undefined) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    closeModal();
  };
  return (
    <>
      <Box>
        {filterList &&
          filterList.map((filter) => (
            <CustomFilter
              filterName={filter.name}
              clickHandler={() => {
                openHandler(filter.name);
              }}
            ></CustomFilter>
          ))}
      </Box>

      <CustomModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalTitle={filterTitle}
        modalCloseElement={<span onClick={closeModal}>OK</span>}
      >
        {filterList &&
          filterList.map((filter) => {
            return (
              filterTitle === filter.name && (
                <OptionListFilterModal
                  optionSelect={filterSelectHandler}
                  optionList={filter.filterOption}
                  relatedFilterName={filter.field}
                  defaultValue=""
                ></OptionListFilterModal>
              )
            );
          })}
      </CustomModal>
    </>
  );
}
