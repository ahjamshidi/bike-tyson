import { CONFIG } from '@/constances/config';
import { fetchWrapper } from '@/utils/fetchWrapper';
const BASE_URL = CONFIG.BaseURL + '/api';
export const getPoliceReportByDate = async (filters: any | undefined) => {
  let filterStr = Object.keys(filters).reduce((acc, curr) => {
    return acc + `${curr}=${filters[curr]}&`;
  }, '');
  filterStr = filterStr.substring(0, filterStr.length - 1);
  console.log(filterStr);
  const result = await fetchWrapper.get(
    `${BASE_URL}/data/police-reports?start_datetime=2023-04-01T00:00:00Z`
  );
  return result;
};
